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
}

interface UserProfileResponse {
  user: UserProfileResponseUserField
}

interface UserProfileResponseUserField {
  taxpayerPerson: TaxpayerPerson
  authType: string | "SMS"
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

