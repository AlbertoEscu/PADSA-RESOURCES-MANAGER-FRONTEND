export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}

export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split(".")[1];

    const json = atob(base64);

    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);

  if (!payload) return true;

  const now = Date.now() / 1000;

  return payload.exp < now;
}
