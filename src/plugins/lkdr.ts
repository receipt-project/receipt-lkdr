import lkdrLocalStorageRepository from "@/apiclients/lkdr/LkdrLocalStorageRepository";
import lkdr from "@/apiclients/lkdr";

function getSmsCode() {
  const code: string | null = prompt("SMS Code")
  if (!code) throw "No sms code provided"
  return code;
}

function runAuth() {
  const phone = lkdrLocalStorageRepository.phone || prompt("Your number (79XXXXXXXXX)", "") || ""

  if (!phone) {
    throw "No phone number provided"
  }

  lkdrLocalStorageRepository.phone = phone;

  return lkdr.doAuth().auth(phone).otp(() => getSmsCode());
}

lkdr.getAuth().then(auth => {
  console.log(auth)
  if (!auth) {
    runAuth()
  }
})
