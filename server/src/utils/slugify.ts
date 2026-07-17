export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateSlug(text: string, suffix?: string): string {
  const base = slugify(text);
  return suffix ? `${base}-${suffix}` : base;
}
