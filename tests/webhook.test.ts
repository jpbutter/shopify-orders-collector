import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import { verifyWebhook } from "../src/webhook.js";

test("accepts a matching signature", () => {
  const body = Buffer.from('{"id":1}', "utf8");
  const secret = "test-secret";
  const signature = createHmac("sha256", secret).update(body).digest("base64");
  assert.equal(verifyWebhook(body, signature, secret), true);
  assert.equal(verifyWebhook(body, "wrong", secret), false);
});
