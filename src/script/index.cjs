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

const _Input_BorderCss = () => {
  console.log("\x1b[34m%s\x1b[0m", "#Input");

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
.ar-input-wrapper.addon:has(> .addon-after) > .ar-input > input.border-radius-${borderType} {
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
@keyframes ${color}-active-animation {
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
      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.filled:not(.disabled).${color} {
  background-color: var(--${color});
}
.filled:not(.disabled).${color}:hover {
  background-color: rgba(var(--${color}-rgb), 0.5);
}
input.filled:not(.disabled).${color}:focus {
  background-color: var(--${color});
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.25);
}
button.filled:not(.disabled).${color}:focus {
  background-color: var(--${color});
}
.filled:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: ${color}-active-animation ease-in-out 750ms 0s 1 normal both;
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
    fs.writeFileSync(file, '@import url("./border.css");\n\n');

    // Mevcut dosyaya yazma işlemi (senkron)
    _colors.map((color) => {
      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.outlined:not(.disabled).${color} {
  border-color: var(--${color});
  color: var(--${color});
  transition: border 250ms, box-shadow 250ms ease-in-out;
}
.outlined:not(.disabled).${color}:hover {
  border-color: rgba(var(--${color}-rgb), 0.5);
}
input.outlined:not(.disabled).${color}:focus {
  border-color: var(--${color});
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
.outlined:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: ${color}-active-animation ease-in-out 750ms 0s 1 normal both;
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
      fs.appendFileSync(
        file,
        `/* #region ${color.toUpperCase()} */
.borderless:not(.disabled).${color} {
  color: var(--${color});
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
  animation: ${color}-active-animation ease-in-out 750ms 0s 1 normal both;
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
_Animation_Css();
_Variant_FilledCss();
_Variant_OutlinedCss();
_Variant_BorderlessCss();
