let generator;

function detectFieldType(textAttrs) {
  // Convert to lowercase and create an array of all possible identifiers
  const attrs = textAttrs.toLowerCase().split(/[\s_-]/);

  const fieldPatterns = {
    email: [
      "email",
      "mail",
      "e-mail",
      "em",
      "بريد",
      "ايميل",
      "e_mail",
      "emailaddress",
    ],

    phone: [
      "phone",
      "ph",
      "tel",
      "mobile",
      "mob",
      "هاتف",
      "جوال",
      "telephone",
      "cell",
      "cellphone",
      "phonenum",
      "phone_number",
      "contact",
      "contactno",
    ],

    name: [
      "name",
      "nm",
      "firstname",
      "fname",
      "fn",
      "first",
      "lastname",
      "lname",
      "ln",
      "last",
      "fullname",
      "full_name",
      "اسم",
      "username",
      "user",
      "uname",
      "nickname",
      "fr",
      "f_name",
      "l_name",
      "surename",
      "middlename",
      "mname",
      "mn",
    ],

    address: [
      "address",
      "addr",
      "adr",
      "عنوان",
      "street",
      "st",
      "city",
      "country",
      "state",
      "province",
      "zip",
      "postal",
      "postcode",
      "post_code",
      "pobox",
      "region",
      "building",
      "apartment",
      "apt",
      "suite",
      "unit",
      "location",
    ],

    password: [
      "password",
      "pass",
      "pwd",
      "pw",
      "كلمة المرور",
      "passwd",
      "passcode",
      "userpass",
      "user_pass",
      "loginpass",
    ],

    date: [
      "date",
      "day",
      "month",
      "year",
      "dob",
      "birth",
      "birthday",
      "birthdate",
      "birth_date",
      "تاريخ",
      "ميلاد",
      "doj",
      "joindate",
      "start_date",
      "end_date",
    ],

    gender: ["gender", "sex", "جنس", "نوع"],

    company: [
      "company",
      "organization",
      "org",
      "workplace",
      "employer",
      "business",
      "شركة",
      "مؤسسة",
    ],

    title: ["title", "position", "job", "role", "designation", "لقب", "وظيفة"],

    website: ["website", "site", "url", "web", "domain", "موقع"],

    social: [
      "facebook",
      "twitter",
      "linkedin",
      "instagram",
      "social",
      "profile",
    ],

    id: ["id", "identity", "ssn", "passport", "national", "هوية", "رقم"],

    comment: [
      "comment",
      "message",
      "msg",
      "note",
      "description",
      "desc",
      "details",
      "feedback",
      "ملاحظات",
      "تعليق",
    ],
  };

  // Check each attribute against our patterns
  for (const [fieldType, patterns] of Object.entries(fieldPatterns)) {
    if (
      patterns.some((pattern) =>
        attrs.some((attr) => attr === pattern || attr.includes(pattern))
      )
    ) {
      return fieldType;
    }
  }

  return "text";
}

function fillForms() {
  if (!generator && window.ArabicDataGenerator) {
    generator = new window.ArabicDataGenerator();
  }

  const formElements = document.querySelectorAll("input, select, textarea");

  formElements.forEach((element) => {
    try {
      if (element.tagName.toLowerCase() === "select") {
        const options = Array.from(element.options);
        const validOptions = options.filter((opt) => opt.value !== "");
        if (validOptions.length) {
          const randomIndex = Math.floor(Math.random() * validOptions.length);
          element.selectedIndex = options.indexOf(validOptions[randomIndex]);
        }
      } else if (element.type === "radio") {
        const radioGroup = document.querySelectorAll(
          `input[name="${element.name}"]`
        );
        if (radioGroup.length) {
          const randomRadio =
            radioGroup[Math.floor(Math.random() * radioGroup.length)];
          randomRadio.checked = true;
        }
      } else if (element.type === "checkbox") {
        element.checked = Math.random() > 0.5;
      } else if (element.type === "date") {
        const startYear = 1950;
        const endYear = new Date().getFullYear();
        const year =
          Math.floor(Math.random() * (endYear - startYear)) + startYear;
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        );
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
        element.value = `${year}-${month}-${day}`;
      } else if (element.type === "number") {
        const min = element.hasAttribute("min") ? parseInt(element.min) : 0;
        const max = element.hasAttribute("max") ? parseInt(element.max) : 100;
        element.value = Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        const textAttrs = `${element.name || ""} ${element.id || ""} ${
          element.placeholder || ""
        } ${element.type || ""}`.toLowerCase();
        const fieldType = detectFieldType(textAttrs);
        element.value = generateValueByType(fieldType);
      }

      // Trigger change events
      element.dispatchEvent(new Event("change", { bubbles: true }));
      element.dispatchEvent(new Event("input", { bubbles: true }));
    } catch (error) {
      console.error("Error filling form element:", error);
    }
  });
}

function generateValueByType(fieldType) {
  switch (fieldType) {
    case "email":
      return generator.generateEmail();
    case "phone":
      return generator.generatePhoneNumber();
    case "name":
      return generator.generateName();
    case "address":
      return generator.generateAddress();
    case "password":
      return generator.generatePassword();
    case "date":
      return generator.generateDate();
    case "gender":
      return generator.generateGender();
    case "company":
      return generator.generateCompany();
    case "title":
      return generator.generateTitle();
    case "website":
      return generator.generateWebsite();
    case "social":
      return generator.generateSocialProfile();
    case "id":
      return generator.generateID();
    case "comment":
      return generator.generateComment();
    default:
      return generator.generateText();
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillForms") {
    fillForms();
    sendResponse({ status: "completed" });
  }
});
