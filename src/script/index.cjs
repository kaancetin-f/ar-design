const fs = require("fs");
const path = require("path");

const _borderTypes = ["sm", "lg", "xl", "xxl", "pill"];
const _colors = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "information",
  "dark",
  "light",
];
let _customFontColor = "";

const _Input_BorderCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Input -> Border");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "components",
      "form",
      "input",
      "core",
      "border.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _borderTypes.map((borderType) => {
      fs.appendFileSync(
        file,
        `/* #region Border Radius -> ${borderType.toUpperCase()} */
.ar-input-wrapper.addon > span.addon-before.border-radius-${borderType} {
  border-radius: var(--border-radius-${borderType}) 0 0 var(--border-radius-${borderType}) !important;
}
.ar-input-wrapper.addon > span.addon-after.border-radius-${borderType} {
  border-radius: 0 var(--border-radius-${borderType}) var(--border-radius-${borderType}) 0 !important;
}

.ar-input-wrapper.addon:has(> .addon-before) > .ar-input > input.border-radius-${borderType} {
  border-radius: 0 var(--border-radius-${borderType}) var(--border-radius-${borderType}) 0 !important;
}
.ar-input-wrapper.addon:has(> .addon-after) > .ar-input > input.border-radius-${borderType},
.ar-input-wrapper:has(> .ar-button) > .ar-input > input.border-radius-${borderType} {
  border-radius: var(--border-radius-${borderType}) 0 0 var(--border-radius-${borderType}) !important;
}
.ar-input-wrapper.addon:has(> .addon-before):has(> .addon-after)
  > .ar-input
  > input.border-radius-${borderType} {
  border-radius: 0 !important;
}
/* #endregion */
/* Border Radius -> ${borderType.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[border.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[border.css] -> Oluşturulamadı!");
  }
};

const _Input_ButtonCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Input -> Button");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "components",
      "form",
      "input",
      "core",
      "button.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _borderTypes.map((borderType) => {
      fs.appendFileSync(
        file,
        `/* #region Border Radius -> ${borderType.toUpperCase()} */
.ar-input-wrapper > .ar-button.border-radius-${borderType} {
  border-radius: 0 var(--border-radius-${borderType}) var(--border-radius-${borderType}) 0;
}
/* #endregion */
/* Border Radius -> ${borderType.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[button.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[button.css] -> Oluşturulamadı!");
  }
};

const _Input_CheckboxCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Checkbox -> Border Color");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "components",
      "form",
      "checkbox",
      "core",
      "border.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      switch (color) {
        case "warning":
          _customFontColor = "dark";
          break;
        case "light":
          _customFontColor = "dark";
          break;
        default:
          _customFontColor = "white";
          break;
      }

      fs.appendFileSync(
        file,
        `/* #region Border Color -> ${color.toUpperCase()} */
.ar-checkbox-wrapper > label > :is(input[type="checkbox"], input[type="radio"]):checked + span > .ar-checkbox.filled.${color}::before {
  border-right-color: var(--${_customFontColor});
  border-bottom-color: var(--${_customFontColor});
}
.ar-checkbox-wrapper > label > :is(input[type="checkbox"], input[type="radio"]):checked + span > .ar-checkbox.outlined.${color}::before {
  border-right-color: var(--${color});
  border-bottom-color: var(--${color});
}
.ar-checkbox-wrapper > label > :is(input[type="checkbox"], input[type="radio"]):checked + span > .ar-checkbox.borderless.${color}::before {
  border-right-color: var(--${color});
  border-bottom-color: var(--${color});
}
/* #endregion */
/* Border Color -> ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[border.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[border.css] -> Oluşturulamadı!");
  }
};

const _Input_SwitchCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Switch -> Border Color");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "components",
      "form",
      "switch",
      "core",
      "border.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      switch (color) {
        case "warning":
          _customFontColor = "dark";
          break;
        case "light":
          _customFontColor = "dark";
          break;
        default:
          _customFontColor = "white";
          break;
      }

      fs.appendFileSync(
        file,
        `/* #region Border Color -> ${color.toUpperCase()} */
.ar-switch-wrapper > label > :is(input[type="checkbox"]):checked + .ar-switch.${color} {
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), .1);
}
.ar-switch-wrapper > label > :is(input[type="checkbox"]):checked + .ar-switch.${color} > .xxy {
  box-shadow: 0 0 0 2.5px var(--${color});
}
/* #endregion */
/* Border Color -> ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[border.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[border.css] -> Oluşturulamadı!");
  }
};

const _Animation_Css = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Variant -> Animation");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(__dirname, "../assets", "css", "core", "variants", "animation.css");
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      fs.appendFileSync(
        file,
        `/* #region Animation -> ${color.toUpperCase()} */
@keyframes clicked-${color} {
  0% {
    box-shadow: 0 0 0 0px rgba(var(--${color}-rgb), 0);
  }
  25% {
    box-shadow: 0 0 0 5px rgba(var(--${color}-rgb), 0.25);
  }
  100% {
    box-shadow: 0 0 0 7.5px rgba(var(--${color}-rgb), 0);
  }
}
/* #endregion */
/* Animation -> ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[animation.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[animation.css] -> Oluşturulamadı!");
  }
};

const _Variant_FilledCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Variant -> Filled");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "core",
      "variants",
      "filled",
      "filled.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      switch (color) {
        case "warning":
          _customFontColor = "dark";
          break;
        case "light":
          _customFontColor = "dark";
          break;
        default:
          _customFontColor = "white";
          break;
      }

      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.filled:not(.disabled).${color} {
  background-color: var(--${color});
  color: var(--${_customFontColor})
}
.filled:not(.disabled).${color}:hover {
  background-color: var(--${color}-active);
}
input.filled:not(.disabled).${color}:focus {
  background-color: var(--${color});
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.25);
}
input[type="checkbox"]:checked + span > .ar-checkbox.filled:not(.disabled).${color}{
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.25);
}
button.filled:not(.disabled).${color}:focus {
  background-color: var(--${color});
}
.filled:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[filled.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[filled.css] -> Oluşturulamadı!");
  }
};

const _Variant_OutlinedCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Variant -> Outlined");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "core",
      "variants",
      "outlined",
      "outlined.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      switch (color) {
        case "light":
          _customFontColor = "dark";
          break;
        default:
          _customFontColor = color;
          break;
      }

      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.outlined:not(.disabled).${color} {
  border-color: var(--${color});
  color: var(--${_customFontColor});
}
.outlined:not(.disabled).${color}:hover {
  border-color: rgba(var(--${color}-rgb), 0.5);
}
input.outlined:not(.disabled).${color}:focus{
  border-color: var(--${color});
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
input[type="checkbox"]:checked + span > .ar-checkbox.outlined:not(.disabled).${color}{
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
.outlined:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[outlined.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[outlined.css] -> Oluşturulamadı!");
  }
};

const _Variant_DashedCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Variant -> Dashed");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "core",
      "variants",
      "dashed",
      "dashed.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      switch (color) {
        case "light":
          _customFontColor = "dark";
          break;
        default:
          _customFontColor = color;
          break;
      }

      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.dashed:not(.disabled).${color} {
  border-color: var(--${color});
  color: var(--${_customFontColor});
}
.dashed:not(.disabled).${color}:hover {
  border-color: rgba(var(--${color}-rgb), 0.5);
}
input.dashed:not(.disabled).${color}:focus{
  border-color: var(--${color});
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
input[type="checkbox"]:checked + span > .ar-checkbox.dashed:not(.disabled).${color}{
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
.dashed:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[dashed.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[dashed.css] -> Oluşturulamadı!");
  }
};

const _Variant_BorderlessCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Variant -> Borderless");

  try {
    // Dosyanın ekleneceği yeri ve adı.
    const file = path.join(
      __dirname,
      "../assets",
      "css",
      "core",
      "variants",
      "borderless",
      "borderless.css"
    );
    // Dosya oluşturma ve yazma işlemi (senkron)
    fs.writeFileSync(file, "");

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      switch (color) {
        case "light":
          _customFontColor = "dark";
          break;
        default:
          _customFontColor = color;
          break;
      }

      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.borderless:not(.disabled).${color} {
  color: var(--${_customFontColor});
}
.borderless:not(.disabled).${color}:hover {
  background-color: rgba(var(--${color}-rgb), 0.25);
}
input.borderless:not(.disabled).${color}:focus {
  border-color: var(--${color});
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
button.borderless:not(.disabled).${color}:focus {
  background-color: var(--${color});
  color: var(--white);
}
.borderless:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */\n\n`
      );
    });

    console.log("\x1b[32m%s\x1b[0m", "[borderless.css] -> Oluşturuldu.");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "[borderless.css] -> Oluşturulamadı!");
  }
};

_Input_BorderCss();
_Input_ButtonCss();
_Input_CheckboxCss();
_Input_SwitchCss();

_Animation_Css();

_Variant_FilledCss();
_Variant_OutlinedCss();
_Variant_DashedCss();
_Variant_BorderlessCss();
