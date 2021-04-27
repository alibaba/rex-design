export function camelToKebab(camel: string): string {
  return camel.replace(/[A-Z]/g, (m: string) => `-${  m.toLowerCase()}`);
}
