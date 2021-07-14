import axios, {AxiosInstance} from "axios";
import SmsChallengeVerifyResponse from "@/apiclients/lkdr/SmsChallengeVerifyResponse";
import lkdrLocalStorageRepository from "@/apiclients/lkdr/LkdrLocalStorageRepository";
import LkdrUnauthorizedApiClient from "@/apiclients/lkdr/LkdrUnauthorizedApiClient";
import {deviceInfo} from "@/apiclients/lkdr/LkdrApiClientCommons";
import LkdrAuthorizedApiClient, {TaxpayerPerson} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";

type AuthStateChangedCallback = (auth: any) => void;

class Lkdr {

  private token: string | null = lkdrLocalStorageRepository.token
  private refreshToken: string | null = lkdrLocalStorageRepository.refreshToken
  private authorized = !!this.token && !!this.refreshToken;
  private authInProgress = false;
  private onAuthStateChangedCallbacks: AuthStateChangedCallback[] = []

  private lkdrUnauthorizedApiClient = new LkdrUnauthorizedApiClient()

  private get lkdrAuthorizedApiClient() {
    if (!this.token) throw "Not authorized: No token present: Use auth method."
    return new LkdrAuthorizedApiClient(this.token)
  }

  async auth() {
    const phone = lkdrLocalStorageRepository.phone || prompt("Your number (79XXXXXXXXX)", "") || ""

    if (!phone) {
      return
    }

    lkdrLocalStorageRepository.phone = phone;

    const challengeStartResponse = await this.lkdrUnauthorizedApiClient.auth.challenge.sms.start({phone})

    const challengeToken = challengeStartResponse.challengeToken;

    const code: string | null = prompt("SMS Code")
    if (!code) return

    try {
      const data = await this.lkdrUnauthorizedApiClient.auth.challenge.sms.verify({
        challengeToken: challengeToken,
        phone: phone,
        code: code,
        deviceInfo: deviceInfo
      });

      console.log(JSON.stringify(data))
      const smsChallengeVerifyResponse = new SmsChallengeVerifyResponse(data);

      this.token = smsChallengeVerifyResponse.token;
      lkdrLocalStorageRepository.token = smsChallengeVerifyResponse.token;
      this.refreshToken = smsChallengeVerifyResponse.refreshToken;
      lkdrLocalStorageRepository.refreshToken = smsChallengeVerifyResponse.refreshToken;

      this.authorized = true
      this.notifyAuthStateChanged()
    } catch (e) {
      console.error(e)
      alert("Could not auth")
    }
  }
  async init(): Promise<void> {
    const refreshToken = lkdrLocalStorageRepository.refreshToken;
    if (refreshToken!= null) {
      const authTokenResponse = await this.lkdrUnauthorizedApiClient.auth.token({
        refreshToken: refreshToken,
        deviceInfo: deviceInfo
      });
      lkdrLocalStorageRepository.token = authTokenResponse.token
      return;
    }

    this.authInProgress = true

    if (!this.authorized) {
      await this.auth()
    } else {
      // do nothing
    }
    this.authInProgress = false
  }

  getAuth() {
    if (!this.authorized) {
      return null;
    } else {
      return {
        token: this.token,
        phone: lkdrLocalStorageRepository.phone,
        taxpayerPerson: this.getTaxpayerPerson()
      }
    }
  }

  async getTaxpayerPerson(): Promise<TaxpayerPerson> {
    const userProfileResponse = await this.lkdrAuthorizedApiClient.user.profile();
    return userProfileResponse.user.taxpayerPerson
  }

  logout() {
    this.token = null
    lkdrLocalStorageRepository.token = null
    this.refreshToken = null
    lkdrLocalStorageRepository.refreshToken = null
    lkdrLocalStorageRepository.phone = null
    this.notifyAuthStateChanged()
  }

  onAuthStateChanged(callback: AuthStateChangedCallback) {
    this.onAuthStateChangedCallbacks.push(callback)
  }

  private notifyAuthStateChanged() {
    for (const onAuthStateChangedCallback of this.onAuthStateChangedCallbacks) {
      try {
        onAuthStateChangedCallback(this.getAuth())
      } catch (e) {
        console.error(e);
      }
    }
  }

  getAxios(): AxiosInstance {
    if (!this.token) throw "Not authorized: No token present: Use init method."

    return axios.create({
      baseURL: "https://lkdr.nalog.ru/",
      headers: {
        "Authorization": "Bearer " + this.token
      }
    })
  }

  static create() {
    return new Lkdr();
  }


}

const lkdr = new Lkdr()

export default lkdr
