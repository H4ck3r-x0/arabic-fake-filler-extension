class ArabicDataGenerator {
  constructor() {
    this.firstNames = [
      "أحمد",
      "محمد",
      "فاطمة",
      "مريم",
      "علي",
      "حسن",
      "زينب",
      "خديجة",
    ];
    this.lastNames = [
      "العربي",
      "المصري",
      "السعودي",
      "الهاشمي",
      "القرشي",
      "العمري",
    ];
    this.cities = ["القاهرة", "الرياض", "دبي", "بغداد", "عمان", "بيروت"];
    this.streets = ["شارع النيل", "شارع الملك فهد", "شارع زايد", "شارع الحمرا"];
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateName() {
    return `${this.getRandomElement(this.firstNames)} ${this.getRandomElement(
      this.lastNames
    )}`;
  }

  generateEmail() {
    const username = Math.random().toString(36).substring(2, 8);
    return `${username}@example.com`;
  }

  generateAddress() {
    return `${this.getRandomElement(this.streets)}، ${this.getRandomElement(
      this.cities
    )}`;
  }

  generatePhoneNumber() {
    return `+966${Math.floor(Math.random() * 1000000000)}`;
  }

  generatePassword() {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}

// Make it available globally
window.ArabicDataGenerator = ArabicDataGenerator;
