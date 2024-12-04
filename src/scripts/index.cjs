const fs = require("fs");
const path = require("path");

const borderTypes = ["sm", "lg", "xl", "xxl", "pill"];
const colors = ["primary", "secondary", "success", "warning", "danger", "information", "dark", "light"];
let customFontColor = "";
let customFocusColor = "";

const WriteCssFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, "");
    fs.appendFileSync(filePath, content);
    console.log("\x1b[32m%s\x1b[0m", `[${path.basename(filePath)}] -> Oluşturuldu.`);
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", `[${path.basename(filePath)}] -> Oluşturulamadı!`);
  }
};

const _Input_BorderCss = async () => {
  const file = path.join(__dirname, "../assets", "css", "components", "form", "input", "core", "border.css");

  const content = borderTypes
    .map(
      (borderType) => `/* #region Border Radius -> ${borderType.toUpperCase()} */
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
/* Border Radius -> ${borderType.toUpperCase()} */`
    )
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Input_ButtonCss = () => {
  const file = path.join(__dirname, "../assets", "css", "components", "form", "input", "core", "button.css");

  const content = borderTypes
    .map(
      (borderType) => `/* #region Border Radius -> ${borderType.toUpperCase()} */
.ar-input-wrapper > .ar-button.border-radius-${borderType} {
  border-radius: 0 var(--border-radius-${borderType}) var(--border-radius-${borderType}) 0;
}
/* #endregion */
/* Border Radius -> ${borderType.toUpperCase()} */`
    )
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Input_CheckboxCss = () => {
  const file = path.join(__dirname, "../assets", "css", "components", "form", "checkbox", "core", "border.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "warning":
          customFontColor = "dark";
          break;
        case "light":
          customFontColor = "dark";
          break;
        default:
          customFontColor = "white";
          break;
      }

      return `/* #region Border Color -> ${color.toUpperCase()} */
.ar-checkbox-wrapper > label > :is(input[type="checkbox"], input[type="radio"]):checked + span > .ar-checkbox.filled.${color}::before {
  border-right-color: var(--${customFontColor});
  border-bottom-color: var(--${customFontColor});
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
/* Border Color -> ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Input_RadioCss = () => {
  const file = path.join(__dirname, "../assets", "css", "components", "form", "radio", "border.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "warning":
          customFontColor = "dark";
          break;
        case "light":
          customFontColor = "dark";
          break;
        default:
          customFontColor = "white";
          break;
      }

      return `/* #region Border Color -> ${color.toUpperCase()} */
.ar-radio-wrapper > label > :is(input[type="radio"]):checked + span > .ar-radio.filled.${color}::before {
  border-right-color: var(--${customFontColor});
  border-bottom-color: var(--${customFontColor});
}
.ar-radio-wrapper > label > :is(input[type="radio"]):checked + span > .ar-radio.outlined.${color}::before {
  border-right-color: var(--${color});
  border-bottom-color: var(--${color});
}
.ar-radio-wrapper > label > :is(input[type="radio"]):checked + span > .ar-radio.borderless.${color}::before {
  border-right-color: var(--${color});
  border-bottom-color: var(--${color});
}
/* #endregion */
/* Border Color -> ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Input_SwitchCss = () => {
  const file = path.join(__dirname, "../assets", "css", "components", "form", "switch", "core", "border.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "warning":
          customFontColor = "dark";
          break;
        case "light":
          customFontColor = "dark";
          break;
        default:
          customFontColor = "white";
          break;
      }

      return `/* #region Border Color -> ${color.toUpperCase()} */
.ar-switch-wrapper > label > :is(input[type="checkbox"]):checked + .ar-switch.${color} {
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), .1);
}
.ar-switch-wrapper > label > :is(input[type="checkbox"]):checked + .ar-switch.${color} > .handle {
  box-shadow: 0 0 0 2px rgba(var(--${color}-rgb), .5);
}
/* #endregion */
/* Border Color -> ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_FilledCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "filled", "filled.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "warning":
          customFontColor = "dark";
          break;
        case "light":
          customFontColor = "dark";
          break;
        default:
          customFontColor = "white";
          break;
      }

      return `/* #region ${color.toUpperCase()} */
.filled:not(.disabled).${color} {
  background-color: var(--${color});
  color: var(--${customFontColor})
}
input.filled:not(.disabled).${color}:hover {
  background-color: var(--${color}-active);
}
input.filled:not(.disabled).${color}:focus {
  background-color: transparent;
  border-color: var(--${color});
  box-shadow: 0 0 0 3.5px rgba(var(--${color}-rgb), 0.25);
}
input[type="checkbox"]:checked + span > .ar-checkbox.filled:not(.disabled).${color}{
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.25);
}
button.filled:not(.disabled).${color} {
  color: var(--${customFontColor});
}
button.filled:not(.disabled).${color}:focus {
  background-color: var(--${color});
}
.filled:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_OutlinedCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "outlined", "outlined.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "light":
          customFontColor = "dark";
          customFocusColor = "primary";
          break;
        default:
          customFontColor = color;
          customFocusColor = color;
          break;
      }

      return `/* #region ${color.toUpperCase()} */
.outlined:not(.disabled).${color} {
  border-color: var(--${color});
  /* color: var(--${customFontColor}); */
}
.outlined:not(.disabled).${color}:hover {
  border-color: rgba(var(--${color}-rgb), 0.5);
}
input.outlined:not(.disabled).${color}:focus{
  border-color: var(--${customFocusColor});
  box-shadow: 0 0 0 3.5px rgba(var(--${customFocusColor}-rgb), 0.25);
}
input[type="checkbox"]:checked + span > .ar-checkbox.outlined:not(.disabled).${color}{
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
.outlined:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_DashedCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "dashed", "dashed.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "light":
          customFontColor = "dark";
          break;
        default:
          customFontColor = color;
          break;
      }

      return `/* #region ${color.toUpperCase()} */
.dashed:not(.disabled).${color} {
  border-color: var(--${color});
  color: var(--${customFontColor});
}
.dashed:not(.disabled).${color}:hover {
  border-color: rgba(var(--${color}-rgb), 0.5);
}
input.dashed:not(.disabled).${color}:focus{
  border-color: var(--${color});
  box-shadow: 0 0 0 3.5px rgba(var(--${color}-rgb), 0.25);
}
input[type="checkbox"]:checked + span > .ar-checkbox.dashed:not(.disabled).${color}{
  box-shadow: 0 0 0 2.5px rgba(var(--${color}-rgb), 0.1);
}
.dashed:not(.disabled).${color}.active {
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_BorderlessCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "borderless", "borderless.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "light":
          customFontColor = "dark";
          break;
        default:
          customFontColor = color;
          break;
      }

      return `/* #region ${color.toUpperCase()} */
.borderless:not(.disabled).${color} {
  color: var(--${customFontColor});
}
.borderless:not(.disabled).${color}:hover {
  background-color: rgba(var(--${color}-rgb), 0.1);
}
input.borderless:not(.disabled).${color}:focus {
  border-color: var(--${color});
  box-shadow: 0 0 0 3.5px rgba(var(--${color}-rgb), 0.1);
}
.borderless:not(.disabled).${color}.active {
  background-color: transparent;
  /* Sırasıyla; Ad, Süre, Hız, Gecikme Süresi, Tekrar Sayısı, Yön, Bitiş Süreci */
  animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
}
/* #endregion */
/* ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Animation_Css = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "animation.css");

  const content = colors
    .map(
      (color) => `/* #region Animation -> ${color.toUpperCase()} */
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
/* Animation -> ${color.toUpperCase()} */`
    )
    .join("\n\n");

  WriteCssFile(file, content);
};

_Input_BorderCss();
_Input_ButtonCss();
_Input_CheckboxCss();
// _Input_RadioCss();
_Input_SwitchCss();

_Variant_FilledCss();
_Variant_OutlinedCss();
_Variant_DashedCss();
_Variant_BorderlessCss();

_Animation_Css();
