# Shopify Orders Collector

A compact TypeScript starter service for collecting Shopify orders through the GraphQL Admin API and writing normalized snapshots to an append-only JSONL file. It demonstrates cursor pagination, explicit configuration, raw-body webhook verification and testable storage boundaries.

## Status

Version **0.1.0** targets Shopify Admin GraphQL API **2026-07**. It contains fictional order data only. OAuth installation flows, databases and production scheduling are intentionally outside this first release.

## Use cases

- Export a bounded order window for local analysis
- Feed a warehouse or reporting prototype
- Test normalization rules against stable fixtures
- Learn GraphQL cursor pagination
- Verify HTTPS webhook HMAC signatures

## Quick start

~~~bash
npm install
cp .env.example .env
npm run dev
~~~

Required local values are **SHOPIFY_STORE** and **SHOPIFY_ACCESS_TOKEN**. Do not commit an Admin API token or webhook secret.

## Commands

- **npm run dev** performs a development collection
- **npm run build** compiles TypeScript
- **npm run typecheck** checks types
- **npm test** runs unit tests

The collector validates configuration, reads pages, normalizes a deliberately small field set, appends JSON lines and follows pageInfo.endCursor. It checks both HTTP status and GraphQL errors.

Order data can contain personal information. Production users must define access controls, minimization, retention and deletion. Logs must not contain tokens or full customer records.