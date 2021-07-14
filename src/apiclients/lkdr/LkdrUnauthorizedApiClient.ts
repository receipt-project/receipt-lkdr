import axios, {AxiosInstance} from "axios";

export default class LkdrUnauthorizedApiClient {

  private webclient: AxiosInstance = axios.create({
    baseURL: "https://lkdr.nalog.ru/api/v1"
  })

  auth = {
    challenge: {
      sms: {
        start: async (request: AuthChallengeSmsStartRequest): Promise<AuthChallengeSmsStartResponse> => {
          const response = await this.webclient.post("/auth/challenge/sms/start", request)
          return response.data as AuthChallengeSmsStartResponse
        },
        verify: async (request: AuthChallengeSmsVerifyRequest): Promise<AuthChallengeSmsVerifyResponse> => {
          const response = await this.webclient.post("/auth/challenge/sms/verify", request);
          return response.data as AuthChallengeSmsVerifyResponse
        }
      }
    },
    token: async (request: AuthTokenRequest): Promise<AuthTokenResponse> => {
      const response = await this.webclient.post("/auth/token", request);
      return response.data as AuthTokenResponse
    }
  }

}

interface AuthTokenRequest {
  refreshToken: string
  deviceInfo: any
}

interface AuthTokenResponse {
  refreshToken: string
  refreshTokenExpiresIn: string | null
  token: string
  tokenExpiresIn: string | null
}

interface AuthChallengeSmsVerifyRequest {
  challengeToken: string
  phone: string
  code: string
  deviceInfo: any
}

interface AuthChallengeSmsVerifyResponse {
  challengeToken: string
  phone: string
  code: string
  deviceInfo: any
}

interface AuthChallengeSmsStartRequest {
  phone: string
}

interface AuthChallengeSmsStartResponse {
  challengeToken: string
}

