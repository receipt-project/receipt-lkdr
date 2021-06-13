class LkdrLocalStorageRepository {


  public get phone(): string | null {
    return localStorage.getItem("lkdr.phone");
  }

  public set phone(phone: string | null) {
    LkdrLocalStorageRepository.setValueOrClear(phone, "lkdr.phone");
  }

  public get token(): string | null {
    return localStorage.getItem("lkdr.token");
  }

  public set token(token: string | null) {
    LkdrLocalStorageRepository.setValueOrClear(token, "lkdr.token");
  }

  public get refreshToken(): string | null {
    return localStorage.getItem("lkdr.refreshToken");
  }

  public set refreshToken(refreshToken: string | null) {
    LkdrLocalStorageRepository.setValueOrClear(refreshToken, "lkdr.refreshToken");
  }

  private static setValueOrClear(value: string | null, key: string) {
    if (!value) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value)
    }
  }
}

const lkdrLocalStorageRepository = new LkdrLocalStorageRepository();

export default lkdrLocalStorageRepository;
