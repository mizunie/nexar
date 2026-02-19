# Nexar SDK

Official TypeScript SDK for Nexar services.

Currently supports:

* WhatsApp messaging
* Template messages
* Interactive messages with buttons

---

## Installation

```bash
npm install nexar-sdk
```

---

## Quick Start

```ts
import { Nexar } from "nexar-sdk";

const nexar = Nexar.init({
  token: "your-auth-token",
  businessId: 123
});

await nexar.whatsapp.sendQuickText(
  "57300XXXXXXX",
  "Hello from Nexar 🚀"
);
```

---

## Configuration

```ts
const nexar = Nexar.init({
  token: "your-auth-token",
  businessId: 123,
  // Optional:
  // baseUrl: "https://staging.nexar.com.co"
});
```

### Options

| Option     | Type            | Required | Description              |
| ---------- | --------------- | -------- | ------------------------ |
| token      | string          | Yes      | API authentication token |
| businessId | string          | Yes      | Your Nexar business ID   |
| baseUrl    | string          | No       | Custom API URL           |

Default API URL:

```
https://back.nexar.com.co
```

---

## WhatsApp API

### Send Text Message

```ts
await nexar.whatsapp.sendText({
  celular: "57300XXXXXXX",
  body: "Hello!"
});
```

### Quick Text

```ts
await nexar.whatsapp.sendQuickText(
  "57300XXXXXXX",
  "Quick message"
);
```

### Send Template

```ts
await nexar.whatsapp.sendTemplate({
  templateName: "welcome_template",
  templateLanguage: "en_US",
  contacts: [
    {
      telefono: "57300XXXXXXX",
      variables: {
        name: "John"
      }
    }
  ]
});
```

### Send Interactive Message

```ts
await nexar.whatsapp.sendInteractive({
  celular: "57300XXXXXXX",
  body: "Choose an option",
  buttonText: "Options",
  buttons: [
    { id: "1", title: "Option 1" },
    { id: "2", title: "Option 2" }
  ]
});
```

---

## Response Format

All methods return:

```ts
interface ApiResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
  errorDetail?: unknown;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}
```

---

## Runtime Support

* Node.js 18+
* Bun
* Deno
* Edge runtimes
* Browsers (if CORS enabled)

---

## IA WABA File API

The IA WABA module allows you to upload, update, expire, or delete indexed documents.

Endpoint:

```
POST /iawaba/api-receptor/{businessId}
```

---

### Upload or Update File

If the file exists, it is fully replaced.
If it does not exist, it is created.

The SDK automatically generates the checksum internally. You only provide the content.

```ts
await nexar.iawaba.uploadFile({
  folder: "auto", // "general" | "auto" | "prompt"
  name: "manual-producto.md",
  content: `# Product Manual

## Features
- High quality
- 2 year warranty`,
  vencido: 0,
  ven: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
});
```

---

### Delete File (Soft Delete)

Marks the file as expired. It becomes inaccessible immediately.

```ts
await nexar.iawaba.deleteFile(
  "auto",
  "manual-producto.md"
);
````

---

### Expiration Examples

```ts
// 7 days
Date.now() + 7 * 24 * 60 * 60 * 1000

// 1 month (approx)
Date.now() + 30 * 24 * 60 * 60 * 1000

// No expiration
ven: null
```

---

### Automatic Cleanup System

* Daily cron job runs automatically
* Files past expiration are removed from storage
* Vector database is re-indexed automatically
* Deleted files become inaccessible immediately

---

## Documentation

For complete API reference, advanced configuration, and platform-specific details, visit:

👉 https://nexar.com.co/api/docs/waba

This SDK covers the most common operations. The full REST API documentation includes:
- Raw endpoint specifications
- Authentication details
- Advanced configuration
- Webhook information
- Error reference

---

## License

MIT
