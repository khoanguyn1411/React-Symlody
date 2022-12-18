export namespace CSSVarService {
  export function set(name: string, value: string): void {
    document.documentElement.style.setProperty(`--${name}`, value);
  }

  export function get(name: string, fallback?: string): string {
    const fb = fallback ? `, ${fallback}` : "";
    return `var(--${name}${fb})`;
  }
}
