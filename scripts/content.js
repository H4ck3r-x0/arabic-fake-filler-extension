const generator = new ArabicDataGenerator();

function fillForms() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    switch (input.type) {
      case "text":
        if (input.name.includes("name") || input.id.includes("name")) {
          input.value = generator.generateName();
        } else if (
          input.name.includes("address") ||
          input.id.includes("address")
        ) {
          input.value = generator.generateAddress();
        }
        break;
      case "email":
        input.value = generator.generateEmail();
        break;
      case "tel":
        input.value = generator.generatePhoneNumber();
        break;
    }
  });
}

// Run immediately when script is injected
fillForms();
