class PhoneMask {
  public FormatByMask = (code: string, value: string) => {
    const mask = this.GetMaskByCountry(code ?? "+90");
    const digits = value.replace(/\D/g, "");
    let result = "";
    let i = 0;

    for (const char of mask) {
      if (char === "9") {
        if (!digits[i]) break;
        result += digits[i++];
      } else {
        result += char;
      }
    }

    return result;
  };

  private GetMaskByCountry(countryCode?: string, length?: number): string {
    if (countryCode && this.countryMasks[countryCode]) {
      return this.countryMasks[countryCode];
    }

    // fallback: length varsa ona göre üret, yoksa 10 ile varsayılan
    return this.GenerateMask(length ?? 10);
  }

  private countryMasks: Record<string, string> = {
    "+90": "999 999 99 99", // Türkiye
    "+1": "999 999 9999", // ABD / Kanada
    "+44": "9999 999999", // İngiltere
    "+49": "9999 9999999", // Almanya
    "+33": "9 99 99 99 99", // Fransa
    "+39": "999 999 9999", // İtalya
    "+34": "999 999 999", // İspanya
    "+351": "999 999 999", // Portekiz
    "+31": "9 99999999", // Hollanda
    "+32": "999 99 99 99", // Belçika
    "+41": "99 999 99 99", // İsviçre
    "+7": "999 999 99 99", // Rusya / Kazakistan
    "+91": "99999 99999", // Hindistan
    "+86": "999 9999 9999", // Çin
    "+81": "99 9999 9999", // Japonya
    "+82": "99 9999 9999", // Güney Kore
    "+61": "9 9999 9999", // Avustralya
    "+55": "99 99999 9999", // Brezilya
    "+52": "999 999 9999", // Meksika
    "+54": "99 9999 9999", // Arjantin
  };

  // length parametresi ile otomatik maske üret
  private GenerateMask(length: number): string {
    if (length <= 0) return "";

    const max = Math.min(length, 15); // E.164 max
    const groups = max <= 10 ? [3, 3, max - 6] : [3, 3, 4, max - 10];

    return groups
      .filter((g) => g > 0)
      .map((g) => "9".repeat(g))
      .join(" ");
  }
}

export default new PhoneMask();
