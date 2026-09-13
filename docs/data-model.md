# Data model

| Field | Meaning |
| --- | --- |
| id | Stable Shopify GraphQL order ID |
| name | Merchant-facing order name |
| createdAt | Source creation time |
| updatedAt | Source update time |
| financialStatus | Display-oriented payment status |
| fulfillmentStatus | Display-oriented fulfillment status |
| currencyCode | Shop-money currency |
| totalAmount | Decimal amount stored as a string |
| lineItemCount | Sum of returned quantities |

The prototype reads the first 100 line items. Very large orders need nested pagination. Display status fields are useful for reports but not sufficient for accounting or warehouse state machines. Samples are fictional and omit customer identity.