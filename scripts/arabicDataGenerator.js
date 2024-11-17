if (typeof window.ArabicDataGenerator === "undefined") {
  window.ArabicDataGenerator = class {
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
      this.streets = [
        "شارع النيل",
        "شارع الملك فهد",
        "شارع زايد",
        "شارع الحمرا",
      ];
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

    generateText() {
      const texts = [
        "هذا نص تجريبي",
        "محتوى توضيحي للاختبار",
        "نص عربي عشوائي",
        "معلومات إضافية للتجربة",
      ];
      return this.getRandomElement(texts);
    }

    generateDate() {
      const startYear = 1950;
      const endYear = new Date().getFullYear();
      const year =
        Math.floor(Math.random() * (endYear - startYear)) + startYear;
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    generateGender() {
      return this.getRandomElement(["ذكر", "أنثى"]);
    }

    generateCompany() {
      return this.getRandomElement([
        "شركة التقنية العربية",
        "مؤسسة النور",
        "شركة الأفق",
        "مجموعة السلام",
      ]);
    }

    generateTitle() {
      return this.getRandomElement(["مدير", "مهندس", "محلل", "مطور", "مستشار"]);
    }

    generateWebsite() {
      return `www.${Math.random().toString(36).substring(2, 8)}.com`;
    }

    generateSocialProfile() {
      return `@${Math.random().toString(36).substring(2, 8)}`;
    }

    generateID() {
      return Math.random().toString().slice(2, 12);
    }

    generateComment() {
      return this.getRandomElement([
        "شكراً جزيلاً",
        "الرجاء المتابعة",
        "موافق على الشروط",
        "أرجو التواصل",
      ]);
    }
  };
}
