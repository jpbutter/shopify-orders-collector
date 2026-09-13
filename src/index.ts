import { collectOrders } from "./collector.js";
import { loadConfig } from "./config.js";
import { ShopifyGraphQLClient } from "./shopify/client.js";
import { jsonlWriter } from "./storage/jsonl.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const client = new ShopifyGraphQLClient(
    config.store,
    config.accessToken,
    config.apiVersion
  );
  const count = await collectOrders(
    client,
    jsonlWriter(config.outputFile),
    config.pageSize,
    config.maxPages
  );
  console.log("Collected " + count + " orders into " + config.outputFile);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
