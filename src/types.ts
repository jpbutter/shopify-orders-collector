export interface NormalizedOrder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  currencyCode: string;
  totalAmount: string;
  lineItemCount: number;
}

export interface OrderNode {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  displayFinancialStatus: string | null;
  displayFulfillmentStatus: string | null;
  totalPriceSet: { shopMoney: { amount: string; currencyCode: string } };
  lineItems: { nodes: Array<{ quantity: number }> };
}
