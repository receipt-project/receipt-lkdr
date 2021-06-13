export default class SmsChallengeVerifyResponse {
  refreshToken: string
  refreshTokenExpiresIn: string | null
  token: string
  tokenExpireIn: string

  constructor(source: any) {
    this.refreshToken = source.refreshToken
    this.refreshTokenExpiresIn = source.refreshTokenExpiresIn || null
    this.token = source.token || null
    this.tokenExpireIn = source.tokenExpireIn || null
  }
}
