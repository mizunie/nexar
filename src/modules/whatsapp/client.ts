import { HttpClient } from "../../core/httpClient";
import { ApiResponse } from "../../core/types";
import {
  WhatsAppMessage,
  WhatsAppInteractive,
  WhatsAppTemplate,
} from "./types";

export interface WhatsAppClientOptions {
  http: HttpClient;
  businessId: string | number;
}

export class WhatsAppClient {
  constructor(
    private http: HttpClient,
    private businessId: string | number
  ) { }

  private endpoint(path: string) {
    return `/twaba${path}/${this.businessId}`;
  }

  async sendText(
    message: WhatsAppMessage
  ): Promise<ApiResponse> {
    return this.http.post(
      this.endpoint("/sendText"),
      message
    );
  }

  async sendInteractive(
    interactive: WhatsAppInteractive
  ): Promise<ApiResponse> {
    if (interactive.buttons.length > 10) {
      return {
        code: 422,
        msg: "Maximum 10 buttons allowed",
      };
    }

    return this.http.post(
      this.endpoint("/sendInteractive"),
      interactive
    );
  }

  async sendTemplate(
    template: WhatsAppTemplate
  ): Promise<ApiResponse> {
    return this.http.post(
      this.endpoint("/sendTemplate"),
      template
    );
  }

  async sendQuickText(
    phone: string,
    message: string
  ) {
    return this.sendText({
      celular: phone,
      body: message,
    });
  }

  async sendTemplateToContact(
    phone: string,
    templateName: string,
    templateLanguage = "en_US",
    variables?: Record<string, string>
  ) {
    return this.sendTemplate({
      templateName,
      templateLanguage,
      contacts: [
        {
          telefono: phone,
          variables,
        },
      ],
    });
  }
}