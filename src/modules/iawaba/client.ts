import { HttpClient } from "../../core/httpClient";
import { ApiResponse } from "../../core/types";

export interface IawabaFile {
  folder: "general" | "auto" | "prompt";
  name: string;
  content: string;
  vencido?: 0 | 1;
  ven?: number | null;
}

export class IawabaClient {
  constructor(
    private http: HttpClient,
    private businessId: string | number
  ) { }

  private endpoint() {
    return `/iawaba/api-receptor/${this.businessId}`;
  }

  async uploadFile(
    file: IawabaFile
  ): Promise<ApiResponse> {
    const payload = {
      ...file,
      md5: generateChecksum(file.content),
      vencido: file.vencido ?? 0,
      ven: file.ven ?? null
    };

    return this.http.post(this.endpoint(), payload);
  }

  async deleteFile(
    folder: "general" | "auto" | "prompt",
    name: string
  ) {
    return this.uploadFile({
      folder,
      name,
      content: "",
      vencido: 1,
      ven: null
    });
  }
}

// checksum ligero compatible con Workers / Browser / Node
function generateChecksum(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}