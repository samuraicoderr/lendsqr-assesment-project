export function base64(input: object) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

export function generateMockToken(type: "access" | "refresh") {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    sub: "user_123",
    type,
    iat: Math.floor(Date.now() / 1000),
  };

  const signature = Math.random().toString(36).substring(2, 15);

  return `${base64(header)}.${base64(payload)}.${signature}`;
}