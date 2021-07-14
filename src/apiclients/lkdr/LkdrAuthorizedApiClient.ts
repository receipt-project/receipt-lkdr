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

  async scan(request: ScanRequest): Promise<ScanResponse> {
    const response = await this.webclient.post("/scan", request)
    return response.data as ScanResponse
  }


}

interface ScanRequest {
  createdDate: string // "2021-06-05T20:55:00.000",
  fiscalDocumentNumber: string //"33104",
  fiscalDriveNumber: string //"9824450300747496",
  fiscalSign: string //"872028198",
  operationType: number //1,
  scanDate: string //"2021-07-14T19:23:44.873Z",
  totalSum: string //"149.90"
}

interface ScanResponse {
  status: string // "OK"
  receipt: ScanResponseReceipt
}

interface ScanResponseReceipt {
  fiscalSign: string //"962427291"
  provisionSum: number // 0.00,
  user: string //"ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЭНГЕЛЬС-ТОРГ\""
  "machineNumber": null,
  fiscalDriveNumber: string //"9386440300477460"
  fiscalDocumentFormatVer: string //"2"
  totalSum: number // 831.90,
  taxationType: number // 1,
  dateTime: string //"2021-06-07T20:55:00"
  items: ScanResponseReceiptItem[]
  userInn: string //"6450944017"
  fiscalDocumentNumber: number // 34004,
  retailPlace: string //"Магазин «Ермолино»"
  "retailPlaceAddress": null,
  cashTotalSum: number // 0.00,
  prepaidSum: number // 0.00,
  kktRegId: string //"0002731446131917
  "paymentAgentType": null,
  requestNumber: number // 388,
  nds10: number // 51.27,
  "messageFiscalSign": null,
  shiftNumber: number // 91,
  "fnsSite": null,
  ecashTotalSum: number // 831.90,
  operationType: number // 1,
  creditSum: number // 0.00,
  nds18: number // 44.67,
  "receiptCode": null,
  "buyerAddress": null,
  operator: string //"Иванов Иван Иванович"
  "internetSign": null
}

interface ScanResponseReceiptItem {
  sum: number // 126.00,
  paymentType: number // 4,
  nds: number // 2,
  "providerInn": null,
  quantity: number // 2.0,
  "name": string // "Носки веселые",
  productType: number // 1,
  price: number // 63.00,
  "providerData": null,
  "paymentAgentData": null
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

