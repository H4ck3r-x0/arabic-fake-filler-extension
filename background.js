chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillForms,
  });
});

function fillForms() {
  const generator = new ArabicDataGenerator();
  const defaultPassword = "password";

  // Smart field type detection
  function detectFieldType(textAttrs) {
    // Email detection
    if (
      textAttrs.includes("email") ||
      textAttrs.includes("بريد") ||
      textAttrs.includes("@")
    ) {
      return "email";
    }

    // Phone detection
    if (
      textAttrs.includes("phone") ||
      textAttrs.includes("هاتف") ||
      textAttrs.includes("جوال") ||
      textAttrs.includes("موبايل")
    ) {
      return "phone";
    }

    // Number detection
    if (
      textAttrs.includes("رقم") ||
      textAttrs.includes("number") ||
      textAttrs.includes("no") ||
      textAttrs.includes("#")
    ) {
      return "number";
    }

    // Name detection
    if (textAttrs.includes("name") || textAttrs.includes("اسم")) {
      return "name";
    }

    // Address detection
    if (textAttrs.includes("address") || textAttrs.includes("عنوان")) {
      return "address";
    }

    return "text";
  }

  function generateValueByType(fieldType) {
    switch (fieldType) {
      case "email":
        return generator.generateEmail();
      case "phone":
        return generator.generatePhoneNumber();
      case "number":
        return Math.floor(Math.random() * 9000000000 + 1000000).toString();
      case "name":
        return generator.generateName();
      case "address":
        return generator.generateAddress();
      default:
        return "نص تجريبي";
    }
  }

  const inputs = document.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    const inputType = input.type;
    const inputName = (input.name || "").toLowerCase();
    const inputId = (input.id || "").toLowerCase();
    const placeholder = (input.placeholder || "").toLowerCase();
    const label =
      input.labels && input.labels[0]
        ? input.labels[0].textContent.toLowerCase()
        : "";

    // Combine all text attributes for better context detection
    const textAttrs = `${inputName} ${inputId} ${placeholder} ${label}`;

    switch (inputType) {
      case "text":
      case "input":
        const fieldType = detectFieldType(textAttrs);
        input.value = generateValueByType(fieldType);
        break;

      case "email": // Handle native email inputs
        input.value = generator.generateEmail();
        break;

      case "tel": // Handle native tel inputs
        input.value = generator.generatePhoneNumber();
        break;

      case "password":
        input.value = defaultPassword;
        break;

      // ... other cases ...
    }

    // Trigger input events
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
