import SmsChallengeVerifyResponse from "@/apiclients/lkdr/SmsChallengeVerifyResponse";
import lkdrLocalStorageRepository from "@/apiclients/lkdr/LkdrLocalStorageRepository";
import LkdrUnauthorizedApiClient from "@/apiclients/lkdr/LkdrUnauthorizedApiClient";
import {deviceInfo} from "@/apiclients/lkdr/LkdrApiClientCommons";
import LkdrAuthorizedApiClient, {TaxpayerPerson} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";

type AuthStateChangedCallback = (auth: any | null) => void;

class Lkdr {

  private _tokenPromise!: Promise<string>

  private get tokenPromise(): Promise<string> {
    return this._tokenPromise
  }

  private set tokenPromise(tokenPromise: Promise<string>) {
    this._tokenPromise = tokenPromise
    this.notifyAuthStateChanged()
  }

  private refreshToken: string | null = lkdrLocalStorageRepository.refreshToken
  private onAuthStateChangedCallbacks: AuthStateChangedCallback[] = []

  private lkdrUnauthorizedApiClient = new LkdrUnauthorizedApiClient()

  public get lkdrAuthorizedApiClient() {
    return new LkdrAuthorizedApiClient(this.tokenPromise)
  }

  constructor() {
    const refreshToken = lkdrLocalStorageRepository.refreshToken;
    if (refreshToken != null) {
      this.tokenPromise = this.lkdrUnauthorizedApiClient.auth
        .token({
          refreshToken: refreshToken,
          deviceInfo: deviceInfo
        })
        .then(authTokenResponse => authTokenResponse.token)
    } else {
      this.tokenPromise = this.auth()
    }
  }

  async auth(): Promise<string> {
    const phone = lkdrLocalStorageRepository.phone || prompt("Your number (79XXXXXXXXX)", "") || ""

    if (!phone) {
      throw "No phone number provided"
    }

    lkdrLocalStorageRepository.phone = phone;

    const challengeStartResponse = await this.lkdrUnauthorizedApiClient.auth.challenge.sms.start({phone})

    const challengeToken = challengeStartResponse.challengeToken;

    const code: string | null = prompt("SMS Code")
    if (!code) throw "No sms code provided"

    try {
      const data = await this.lkdrUnauthorizedApiClient.auth.challenge.sms.verify({
        challengeToken: challengeToken,
        phone: phone,
        code: code,
        deviceInfo: deviceInfo
      });

      console.log(JSON.stringify(data))
      const smsChallengeVerifyResponse = new SmsChallengeVerifyResponse(data);

      this.refreshToken = smsChallengeVerifyResponse.refreshToken;
      lkdrLocalStorageRepository.refreshToken = smsChallengeVerifyResponse.refreshToken;

      return smsChallengeVerifyResponse.token
    } catch (e) {
      console.error(e)
      alert("Could not auth")
      return Promise.reject("Could not auth")
    }
  }
  async getAuth(): Promise<AuthInfo | null> {
    let token = null;
    if (this.tokenPromise) {
      token = await this.tokenPromise.catch(() => null);
    }

    if (!token) {
      return null;
    }

    return {
      token: token,
      phone: lkdrLocalStorageRepository.phone,
      taxpayerPerson: await this.getTaxpayerPerson()
    }
  }
  async getTaxpayerPerson(): Promise<TaxpayerPerson> {
    const userProfileResponse = await this.lkdrAuthorizedApiClient.user.profile();
    return userProfileResponse.user.taxpayerPerson
  }

  async logout() {
    this.tokenPromise = Promise.reject("Unauthorized")
    this.refreshToken = null
    lkdrLocalStorageRepository.refreshToken = null
    lkdrLocalStorageRepository.phone = null
    await this.notifyAuthStateChanged()
  }

  onAuthStateChanged(callback: AuthStateChangedCallback) {
    this.onAuthStateChangedCallbacks.push(callback)
  }

  private async notifyAuthStateChanged() {
    for (const onAuthStateChangedCallback of this.onAuthStateChangedCallbacks) {
      try {
        onAuthStateChangedCallback(await this.getAuth())
      } catch (e) {
        console.error(e);
      }
    }
  }

  static create() {
    return new Lkdr();
  }

}

const lkdr = new Lkdr()

export default lkdr

export interface AuthInfo {
  token: string
  phone: string | null
  taxpayerPerson: TaxpayerPerson
}
