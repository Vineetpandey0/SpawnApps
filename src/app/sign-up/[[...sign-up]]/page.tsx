import { SignUp } from "@clerk/nextjs";


export default async function SignUpPage(props: { searchParams: Promise<{ prompt?: string }> }) {
  const searchParams = await props.searchParams;
  const prompt = searchParams?.prompt;
  const redirectUrl = prompt ? `/dashboard?prompt=${encodeURIComponent(prompt)}` : "/dashboard";

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#fafafa]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/15 blur-[120px] pointer-events-none" />
      
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4 py-12">
        
        
        <div className="w-full drop-shadow-2xl">
          <SignUp
            fallbackRedirectUrl={redirectUrl}
            appearance={{
              layout: {
                socialButtonsPlacement: 'bottom',
                socialButtonsVariant: 'blockButton',
              },
              variables: {
                colorPrimary: '#6366f1',
                colorBackground: '#ffffff',
                colorText: '#111827',
                colorTextSecondary: '#6b7280',
                colorInputBackground: '#ffffff',
                colorInputText: '#111827',
                borderRadius: '1rem',
                fontFamily: 'inherit',
              },
              elements: {
                card: "shadow-none border border-black/[0.06] bg-white/80 backdrop-blur-xl w-full",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-500",
                formButtonPrimary: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md transition-all border-none font-semibold",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50 transition-all text-gray-700 font-medium",
                formFieldInput: "border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all rounded-xl bg-white",
                footerActionLink: "text-indigo-600 hover:text-indigo-700 font-semibold",
                identityPreviewEditButtonIcon: "text-indigo-600",
                formFieldLabel: "text-gray-700 font-medium",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-400 font-medium",
                formFieldInputShowPasswordButton: "text-gray-500",
                socialButtonsBlockButtonText: "text-gray-700 font-medium",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}