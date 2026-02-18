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
| businessId | string | number | Yes      | Your Nexar business ID   |
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

## License

MIT
