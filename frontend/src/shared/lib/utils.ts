export function cleanParams(params: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== '' && value !== undefined && value !== null) {
      clean[key] = value;
    }
  }
  return clean;
}
