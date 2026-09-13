import type { ShopifyGraphQLClient } from "./shopify/client.js";
import type { NormalizedOrder, OrderNode } from "./types.js";

const ORDERS_QUERY = [
  "query Orders($first: Int!, $after: String) {",
  "  orders(first: $first, after: $after, sortKey: UPDATED_AT) {",
  "    nodes { id name createdAt updatedAt displayFinancialStatus displayFulfillmentStatus",
  "      totalPriceSet { shopMoney { amount currencyCode } }",
  "      lineItems(first: 100) { nodes { quantity } }",
  "    }",
  "    pageInfo { hasNextPage endCursor }",
  "  }",
  "}"
].join("\n");

interface OrdersPage {
  orders: {
    nodes: OrderNode[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  };
}

export function normalizeOrder(order: OrderNode): NormalizedOrder {
  return {
    id: order.id,
    name: order.name,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    financialStatus: order.displayFinancialStatus,
    fulfillmentStatus: order.displayFulfillmentStatus,
    currencyCode: order.totalPriceSet.shopMoney.currencyCode,
    totalAmount: order.totalPriceSet.shopMoney.amount,
    lineItemCount: order.lineItems.nodes.reduce((sum, item) => sum + item.quantity, 0)
  };
}

export async function collectOrders(
  client: ShopifyGraphQLClient,
  write: (order: NormalizedOrder) => Promise<void>,
  pageSize: number,
  maxPages: number
): Promise<number> {
  let cursor: string | null = null;
  let count = 0;
  for (let page = 0; page < maxPages; page += 1) {
    const data: OrdersPage = await client.request<OrdersPage>(ORDERS_QUERY, {
      first: pageSize,
      after: cursor
    });
    for (const node of data.orders.nodes) {
      await write(normalizeOrder(node));
      count += 1;
    }
    if (!data.orders.pageInfo.hasNextPage) break;
    cursor = data.orders.pageInfo.endCursor;
    if (!cursor) throw new Error("Next page announced without cursor");
  }
  return count;
}
