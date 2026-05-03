import { prisma } from "@/lib/db/prisma"
import { callGeminiForData } from "@/lib/gemini"
import { componentRegistry } from "@/lib/runtime/componentRegistry"
import RateLimitToast from "./RateLimitToast"

export default async function AppRenderer({
  appId,
  path
}: {
  appId: string
  path: string
}) {
  const app = await prisma.app.findUnique({
    where: { id: appId }
  })

  if (!app) return <div>App not found</div>

  const config = app.config_json as any
  let page = config.pages.find((p: any) => p.path === path)

  // Fallback: If path not found, or it defaulted to "/home" but the AI generated something else like "/", use the first page
  if (!page && config.pages && config.pages.length > 0) {
    page = config.pages[0];
  }

  if (!page) return <div>Page not found</div>

  const pageType = page.type?.toLowerCase().trim()
  const Component = componentRegistry[pageType] || componentRegistry[page.type]
  if (!Component) return <div>Unsupported page type: {page.type}</div>

  let data: any = {}

  // Check if we already generated data for this path (stored in chats)
  let existingData = null;
  const previousChats = await prisma.chats.findMany({
    where: { appId: app.id, role: "assistant" }
  });

  for (const chat of previousChats) {
    try {
      const parsed = JSON.parse(chat.messages);
      if (parsed.path === path && parsed.data) {
        existingData = parsed.data;
        break;
      }
    } catch (e) {
      // Ignore chats that aren't valid JSON with our path/data structure
    }
  }

  // Generate dynamic runtime data via Gemini
  if (existingData) {
    data = existingData; // Use cached data to save API tokens
  } else {
    data = await callGeminiForData(app.name, config, page);
    
    // Store the generated data in chats as the assistant's response
    try {
      await prisma.chats.create({
        data: {
          appId: app.id,
          userId: app.userId,
          role: "assistant",
          messages: JSON.stringify({ path, data })
        }
      });
    } catch (e) {
      console.error("Failed to store generated data in chats:", e);
    }
  }

  // Handle Rate Limit Error
  if (data?._error === "rate_limit") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <RateLimitToast />
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 max-w-md shadow-sm">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h2 className="text-xl font-bold text-rose-900 mb-2">API Limit Reached</h2>
          <p className="text-rose-700 mb-6 font-medium">The shared Gemini API key has reached its usage limit. To continue building and previewing apps, please add your own API key.</p>
          
        </div>
      </div>
    )
  }

  return <Component page={page} data={data} />
}
