import lkdrLocalStorageRepository from "@/apiclients/lkdr/LkdrLocalStorageRepository";
import LkdrUnauthorizedApiClient from "@/apiclients/lkdr/LkdrUnauthorizedApiClient";
import {deviceInfo} from "@/apiclients/lkdr/LkdrApiClientCommons";
import LkdrAuthorizedApiClient, {TaxpayerPerson} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";
import LkdrAuthorizer from "@/apiclients/lkdr/LkdrAuthorizer";

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

  public get api() {
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
      this.tokenPromise = Promise.reject()
    }
  }

  public doAuth() {
    return new LkdrAuthorizer((authPromise => {
      return this.tokenPromise = authPromise.then(it => {
        this.refreshToken = it.refreshToken
        lkdrLocalStorageRepository.refreshToken = it.refreshToken
        console.log(this.refreshToken)
        return it.token;
      });
    }))
  }

  async getAuth(): Promise<AuthInfo | null> {
    let token = null;
    console.log(this.tokenPromise)
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

  private async getTaxpayerPerson(): Promise<TaxpayerPerson> {
    const userProfileResponse = await this.api.user.profile();
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
