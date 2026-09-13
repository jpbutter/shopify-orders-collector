export interface Config {
  store: string;
  accessToken: string;
  apiVersion: string;
  outputFile: string;
  pageSize: number;
  maxPages: number;
}

function integer(name: string, fallback: number): number {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(name + " must be a positive integer");
  }
  return value;
}

export function loadConfig(): Config {
  const store = process.env.SHOPIFY_STORE;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!store || !accessToken) {
    throw new Error("SHOPIFY_STORE and SHOPIFY_ACCESS_TOKEN are required");
  }
  return {
    store: store.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    accessToken,
    apiVersion: process.env.SHOPIFY_API_VERSION ?? "2026-07",
    outputFile: process.env.OUTPUT_FILE ?? "data/orders.jsonl",
    pageSize: integer("PAGE_SIZE", 50),
    maxPages: integer("MAX_PAGES", 20)
  };
}
