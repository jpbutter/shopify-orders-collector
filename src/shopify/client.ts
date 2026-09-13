export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export class ShopifyGraphQLClient {
  constructor(
    private readonly store: string,
    private readonly token: string,
    private readonly apiVersion: string
  ) {}

  async request<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const endpoint =
      "https://" + this.store + "/admin/api/" + this.apiVersion + "/graphql.json";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.token
      },
      body: JSON.stringify({ query, variables })
    });
    if (!response.ok) {
      throw new Error("Shopify request failed: HTTP " + response.status);
    }
    const payload = (await response.json()) as GraphQLResponse<T>;
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error) => error.message).join("; "));
    }
    if (!payload.data) throw new Error("Shopify response did not include data");
    return payload.data;
  }
}
