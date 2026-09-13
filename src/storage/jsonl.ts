import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

import type { NormalizedOrder } from "../types.js";

export function jsonlWriter(file: string): (order: NormalizedOrder) => Promise<void> {
  return async (order: NormalizedOrder): Promise<void> => {
    await mkdir(dirname(file), { recursive: true });
    await appendFile(file, JSON.stringify(order) + "\n", "utf8");
  };
}
