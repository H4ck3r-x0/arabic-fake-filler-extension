const generator = new ArabicDataGenerator();

function fillForms() {
  const inputs = document.querySelectorAll("input");
  let generatedPassword = null;

  // Clear all form fields first
  inputs.forEach((input) => {
    input.value = "";
  });

  // First pass: find password field and generate a password
  inputs.forEach((input) => {
    if (input.type === "password" && !generatedPassword) {
      generatedPassword = generator.generatePassword();
    }
  });

  // Second pass: fill all fields
  inputs.forEach((input) => {
    // Get input attributes for better field detection
    const inputType = input.type;
    const inputName = (input.name || "").toLowerCase();
    const inputId = (input.id || "").toLowerCase();
    const placeholder = (input.placeholder || "").toLowerCase();

    // Combine all text attributes for better matching
    const textAttrs = `${inputName} ${inputId} ${placeholder}`;

    switch (inputType) {
      case "text":
      case "input":
        // Name fields
        if (
          textAttrs.includes("first") ||
          textAttrs.includes("fname") ||
          textAttrs.includes("اسم")
        ) {
          input.value = generator.getRandomElement(generator.firstNames);
        }
        // Last name fields
        else if (
          textAttrs.includes("last") ||
          textAttrs.includes("lname") ||
          textAttrs.includes("family") ||
          textAttrs.includes("عائلة")
        ) {
          input.value = generator.getRandomElement(generator.lastNames);
        }
        // Full name fields
        else if (textAttrs.includes("name") || textAttrs.includes("اسم")) {
          input.value = generator.generateName();
        }
        // Address fields
        else if (textAttrs.includes("address") || textAttrs.includes("عنوان")) {
          input.value = generator.generateAddress();
        }
        break;

      case "email":
        input.value = generator.generateEmail();
        break;

      case "tel":
      case "phone":
      case "number":
        if (
          textAttrs.includes("phone") ||
          textAttrs.includes("mobile") ||
          textAttrs.includes("tel") ||
          textAttrs.includes("جوال") ||
          textAttrs.includes("هاتف")
        ) {
          input.value = generator.generatePhoneNumber();
        }
        break;

      case "password":
        input.value = generatedPassword;
        break;
    }

    // Trigger input events to activate any validation
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  // Return a message for debugging
  return `Forms filled at ${new Date().toLocaleTimeString()}`;
}

// Run immediately when script is injected
fillForms();
