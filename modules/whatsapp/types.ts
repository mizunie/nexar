export interface WhatsAppContact {
  telefono: string;
  variables?: Record<string, string>;
}

export interface WhatsAppMessage {
  celular: string;
  body: string;
}

export interface WhatsAppButton {
  id: string;
  title: string;
}

export interface WhatsAppInteractive {
  celular: string;
  body: string;
  buttons: WhatsAppButton[];
  buttonText: string;
}

export interface WhatsAppTemplate {
  templateName: string;
  templateLanguage: string;
  contacts: WhatsAppContact[] | string;
}
