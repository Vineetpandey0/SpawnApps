export function resolvePage(config: any, slug: string[]) {
  if (!config || !config.pages || !Array.isArray(config.pages)) {
    return null;
  }
  
  const targetPath = '/' + slug.join('/');
  
  return config.pages.find((p: any) => p.path === targetPath) || null;
}
