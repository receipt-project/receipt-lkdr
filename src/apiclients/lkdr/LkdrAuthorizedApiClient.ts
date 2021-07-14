import axios, {AxiosInstance} from "axios";

export default class LkdrAuthorizedApiClient {

  private readonly token: string
  private readonly webclient: AxiosInstance

  constructor(token: string) {
    this.token = token
    this.webclient = axios.create({
      baseURL: "https://lkdr.nalog.ru/api/v1",
      headers: {
        "Authorization": "Bearer " + this.token
      }
    })
  }

  user = {
    profile: async (): Promise<UserProfileResponse> => {
      const response = await this.webclient.get("/user/profile")
      return response.data as UserProfileResponse
    }
  }

  async receipt(request: ReceiptRequest): Promise<ReceiptResponse> {
    const response = await this.webclient.post("/receipt", request);
    return response.data as ReceiptResponse
  }

}

interface UserProfileResponse {
  user: UserProfileResponseUserField
}

interface UserProfileResponseUserField {
  taxpayerPerson: TaxpayerPerson
  authType: string | "SMS"
}

interface ReceiptRequest {
  limit: number | null,
  offset: number | null,
  dateFrom: string | null,
  dateTo: string | null,
  orderBy: string | null,
  inn: string | null
}

interface ReceiptResponse {
  brands: ReceiptResponseBrand[]
  hasMore: boolean
  receipts: ReceiptResponseReceipt[]
}

export interface ReceiptResponseReceipt {
  brandId: number
  buyer: string
  buyerType: string
  createdDate: string
  fiscalDocumentNumber: string
  fiscalDriveNumber: string
  key: string
  kktOwner: string
  kktOwnerInn: string
  receiveDate: string
  totalSum: string
}

export interface ReceiptResponseBrand {
  description: string
  id: number
  image: string
  name: string
}

export interface TaxpayerPerson {
  email: string | null,
  phone: string | null,
  inn: string | null,
  fullName: string | null,
  shortName: string | null,
  status: string | null,
  address: string | null,
  oktmo: string | null,
  authorityCode: string | null,
  firstName: string | null,
  lastName: string | null,
  middleName: string | null
}

