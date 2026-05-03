import AppRenderer from "@/components/runtime/AppRenderer"

export default async function AppPreview(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { appId } = params;
  const path = searchParams?.path || "/home";

  return <AppRenderer appId={appId} path={path} />;
}