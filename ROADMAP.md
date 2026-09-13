# Roadmap

## 0.2 — Reliability

- Retry throttled queries with bounded backoff
- Read GraphQL query costs
- Persist collection checkpoints
- Make reruns idempotent

## 0.3 — Storage

- Define an OrderSink interface
- Add PostgreSQL upserts
- Add object-storage batches
- Support field-minimization profiles

## 0.4 — Webhooks

- Add a small HTTPS receiver
- Queue verified order events
- Reconcile events with scheduled collections
- Document subscription setup

Bulk Operations and warehouse-specific mapping adapters are candidates after the reliability model is proven.