export const handlePath = (path: string) => {
  return `${path?.startsWith('/') ? '' : '/'}${path}`;
}
