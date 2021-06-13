import axios, {AxiosInstance} from "axios";
import SmsChallengeVerifyResponse from "@/apiclients/lkdr/SmsChallengeVerifyResponse";
import lkdrLocalStorageRepository from "@/apiclients/lkdr/LkdrLocalStorageRepository";

type AuthStateChangedCallback = (auth: any) => void;

class LkdrApiClient {

  private token: string | null = lkdrLocalStorageRepository.token
  private refreshToken: string | null = lkdrLocalStorageRepository.refreshToken
  private authorized = !!this.token && !!this.refreshToken;
  private authInProgress = false;
  private onAuthStateChangedCallbacks: AuthStateChangedCallback[] = []

  async auth() {
    const phone = lkdrLocalStorageRepository.phone || prompt("Your number (79XXXXXXXXX)", "") || ""

    if (!phone) {
      return
    }

    lkdrLocalStorageRepository.phone = phone;

    const challengeStartResponse = await this.getUnauthorizedAxios().post("/api/v1/auth/challenge/sms/start", {phone})
    const challengeToken = challengeStartResponse.data.challengeToken;

    const code: string | null = prompt("SMS Code")

    try {
      const challengeVerifyResponse = await this.getUnauthorizedAxios().post("/api/v1/auth/challenge/sms/verify", {
        challengeToken: challengeToken,
        phone: phone,
        code: code,
        deviceInfo: LkdrApiClient.deviceInfo
      });

      const data = challengeVerifyResponse?.data;

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
    this.authInProgress = true
    if (!this.authorized) {
      await this.auth()
    } else {
      // do nothing
    }
  }

  getAuth() {
    if (!this.authorized) {
      return null;
    } else {
      return {
        token: this.token,
        phone: lkdrLocalStorageRepository.phone
      }
    }
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

  getUnauthorizedAxios(): AxiosInstance {
    return axios.create({
      baseURL: "https://lkdr.nalog.ru/"
    })
  }

  static create() {
    return new LkdrApiClient();
  }

  private static deviceInfo = {
    sourceDeviceId: "vpiiiB_crOBisv4cKpxyW",
    sourceType: "WEB",
    appVersion: "1.0.0",
    metaDetails: {
      userAgent: "Mozilla/5.0 AppleWebKit Chrome"
    }
  };

}

const lkdrApiClient = new LkdrApiClient()

export default lkdrApiClient
