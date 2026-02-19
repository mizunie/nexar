import { HttpClient } from "./core/httpClient";
import { IawabaClient } from "./modules/iawaba/client";
import { WhatsAppClient } from "./modules/whatsapp/client";

const DEFAULT_BASE_URL = "https://back.nexar.com.co";

export class Nexar {
  static init(options: {
    token: string;
    businessId: string | number;
    baseUrl?: string;
  }) {
    const http = new HttpClient({
      baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
      authToken: options.token,
    });

    return {
      whatsapp: new WhatsAppClient(http, options.businessId),
      iawaba: new IawabaClient(http, options.businessId)
    };
  }
}