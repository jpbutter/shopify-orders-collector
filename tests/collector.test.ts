import assert from "node:assert/strict";
import test from "node:test";

import { normalizeOrder } from "../src/collector.js";
import type { OrderNode } from "../src/types.js";

test("normalizes an order node", () => {
  const order: OrderNode = {
    id: "gid://shopify/Order/1",
    name: "#DEMO-1",
    createdAt: "2026-09-13T08:00:00Z",
    updatedAt: "2026-09-13T08:01:00Z",
    displayFinancialStatus: "PAID",
    displayFulfillmentStatus: "UNFULFILLED",
    totalPriceSet: { shopMoney: { amount: "34.90", currencyCode: "EUR" } },
    lineItems: { nodes: [{ quantity: 2 }, { quantity: 1 }] }
  };
  const normalized = normalizeOrder(order);
  assert.equal(normalized.lineItemCount, 3);
  assert.equal(normalized.totalAmount, "34.90");
});
