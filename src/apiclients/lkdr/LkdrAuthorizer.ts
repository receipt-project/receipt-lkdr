import LkdrUnauthorizedApiClient, {
  AuthChallengeSmsVerifyResponse,
  exceptions
} from "@/apiclients/lkdr/LkdrUnauthorizedApiClient";
import {deviceInfo} from "@/apiclients/lkdr/LkdrApiClientCommons";

export default class LkdrAuthorizer {

  private readonly authPromiseConsumer: (authPromise: Promise<AuthChallengeSmsVerifyResponse>) => void;
  private _phone: string | null = null

  constructor(authPromiseConsumer: (authPromise: Promise<AuthChallengeSmsVerifyResponse>) => void) {
    this.authPromiseConsumer = authPromiseConsumer
  }

  private luac: LkdrUnauthorizedApiClient = new LkdrUnauthorizedApiClient();

  /**
   *
   * @param phone user phone number (79991234567)
   */
  _auth(phone: string): Promise<(otp: string) => Promise<void>> {
    phone = phone.replaceAll("[^\\d]", "");
    if (this._phone) throw "Auth already started!";
    this._phone = phone;
    const start = this.luac.auth.challenge.sms.start({phone})

    return start
      .then(startResponse => startResponse.challengeToken)
      .then(challengeToken => { // Save challenge token to restore next time if auth will be interrupted
        localStorage.setItem("lkdr.auth.challengeTokens." + phone, challengeToken)
        return challengeToken
      })
      .catch(e => { // Try to restore challenge token from previous session
        console.error("Sms code not expired. " + e)
        if (e !== exceptions.CODE_ALREADY_SENT) return Promise.reject(e);
        return localStorage.getItem("lkdr.auth.challengeTokens." + phone) || Promise.reject(e);
      })
      .then(challengeToken => otp => this.otp(phone, otp, challengeToken));
  }

  auth(phone: string) : ToBeSmsed {
    return new ToBeSmsed(this._auth(phone));
  }

  private otp(phone: string, otp: string, challengeToken: string) {
    const authChallengeSmsVerifyResponsePromise = this.smsVerify(challengeToken, phone, otp);
    this.authPromiseConsumer(authChallengeSmsVerifyResponsePromise)
    return authChallengeSmsVerifyResponsePromise
      .then(() => Promise.resolve());
  }

  private smsVerify(challengeToken: string, phone: string, otp: string) {
    return this.luac.auth.challenge.sms
      .verify({
        challengeToken: challengeToken,
        phone: phone,
        code: otp,
        deviceInfo: deviceInfo
      });
  }
}

class ToBeSmsed {
  toBeSmsed: Promise<(otp: string) => Promise<void>>

  constructor(toBeSmsed: Promise<(otp: string) => Promise<void>>) {
    this.toBeSmsed = toBeSmsed
  }

  otp(otpGetter: () => string) {
    this.toBeSmsed
      .then((toBeSmsed: (otp: string) => Promise<void>) => {
        return toBeSmsed(otpGetter());
      })
  }

}
