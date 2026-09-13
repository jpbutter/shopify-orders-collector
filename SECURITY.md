# Security Policy

Only the latest minor version is supported. Report vulnerabilities through a private GitHub security advisory.

If a token is exposed, revoke it in Shopify immediately. Removing one commit is insufficient. Verify webhook signatures against the unmodified raw body before parsing JSON, and never log tokens or complete customer payloads.