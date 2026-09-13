# Architecture

Configuration validates required settings. The GraphQL client owns transport, authentication headers and GraphQL errors. The collector owns pagination and normalization. Storage is injected as a function, keeping the collector independent from files and databases.

Webhooks provide low latency but may be retried or delayed. Periodic reconciliation provides completeness. A mature integration uses both and treats the order ID plus update timestamp as an idempotency key.

JSONL is transparent for a prototype but repeated runs can create duplicates. Production storage should upsert, retain source timestamps and record the normalization schema version.