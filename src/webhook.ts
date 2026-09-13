import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyWebhook(
  rawBody: Buffer,
  providedHmac: string | undefined,
  secret: string
): boolean {
  if (!providedHmac) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("base64");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const providedBuffer = Buffer.from(providedHmac, "utf8");
  return (
    expectedBuffer.length === providedBuffer.length &&
    timingSafeEqual(expectedBuffer, providedBuffer)
  );
}
