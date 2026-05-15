export function readServerEnv(name: string): string | undefined {
  const processEnv = typeof process === "undefined" ? undefined : process.env;
  const value = processEnv?.[name];

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
