const fs = require("fs");
const path = require("path");

const borderTypes = ["sm", "lg", "xl", "xxl", "pill"];
// const colors = [
//   "primary",
//   "primary-light",
//   "secondary",
//   "success",
//   "warning",
//   "danger",
//   "information",
//   "dark",
//   "light",
// ];
const colors = ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray", "light"];
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

const _Input_SwitchCss = () => {
  const file = path.join(__dirname, "../assets", "css", "components", "form", "switch", "core", "border.css");

  const content = colors
    .map((color) => {
      return `/* #region Border Color -> ${color.toUpperCase()} */
.ar-switch-wrapper {
  > label {
    > input[type="checkbox"] {
      + span.${color} {
        background-color: var(--${color}-500);
      }

      &.checked {
        + .span.${color} {
          background-color: var(--${color}-500);
        }
      }
    }
  }
}
/* #endregion */
/* Border Color -> ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_FilledCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "filled", "styles.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "yellow":
        case "gray":
          customFontColor = "black";
          break;
        default:
          customFontColor = "white";
          break;
      }

      return `/* #region ${color.toUpperCase()} */
.filled:not(.disabled) {
  &.${color} {
    background-color: var(--${color}-500);
    color: var(--${customFontColor});
    
    &.active {
      animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
    }
  }
}

input.filled:not(.disabled) {
  &.${color} { 
    background-color: var(--${color}-500);

    &:hover {
      background-color: var(--${color}-300);
    }
    &:focus,&.focused {
      background-color: transparent;
      border-color: var(--${color}-300);
      box-shadow: 0 0 0 3.5px var(--${color}-100);
    }
  }
}

button.filled:not(.disabled) {
  &.${color} { 
    background-color: var(--${color}-500);

    &:hover,
    &:focus {
      background-color: var(--${color}-300);
    }
  }
}
/* #endregion */
/* ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_SurfaceCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "surface", "styles.css");

  const content = colors
    .map((color) => {
      return `/* #region ${color.toUpperCase()} */
.surface:not(.disabled) {
  &.${color} {
    background-color: var(--${color}-100);
    border:solid 1px var(--${color}-300);
    color: var(--${color}-600);
    
    &.active {
      animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
    }
  }
}
      
button.surface:not(.disabled) {
  &.${color} { 
    &:hover,
    &:focus {
      background-color: var(--${color}-300);
    }
  }
}
/* #endregion */
/* ${color.toUpperCase()} */`;
    })
    .join("\n\n");

  WriteCssFile(file, content);
};

const _Variant_OutlinedCss = () => {
  const file = path.join(__dirname, "../assets", "css", "core", "variants", "outlined", "styles.css");

  const content = colors
    .map((color) => {
      switch (color) {
        case "light":
          customFontColor = "black";
          break;
        default:
          customFontColor = `${color}-500`;
          break;
      }

      return `/* #region ${color.toUpperCase()} */
.outlined:not(.disabled) {
  &.${color} {
    &.active {
      animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
    }
  }
}

input.outlined:not(.disabled),
iframe.outlined:not(.disabled),
.ar-select > .selections.outlined:not(.disabled) {
  &.${color} {
    border: solid 1px var(--${color}-500);
    color: var(--${customFontColor});

    &:focus,
    &.focused {
      border-color: var(--${color}-300);
      box-shadow: 0 0 0 3.5px var(--${color}-100);
    }
  }
}

button.outlined:not(.disabled) {
  &.${color} { 
    color: var(--${color}-500);

    &:hover,
    &:focus {
      background-color: var(--${color}-100);
    }
  }
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
      return `/* #region ${color.toUpperCase()} */
.dashed:not(.disabled) {
  &.${color} {
    border: dashed 1px var(--${color}-500);
    color: var(--${color}-500);

    &.active {
      animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
    }
  }
}

input.dashed:not(.disabled),
iframe.dashed:not(.disabled) {
  &.${color} {
    &:focus,
    &.focused {
      border-color: var(--${customFocusColor});
      box-shadow: 0 0 0 3.5px rgba(var(--${customFocusColor}-rgb), 0.25);
    }
  }
}

button.dashed:not(.disabled) {
  &.${color} { 
    &:hover,
    &:focus {
      background-color: var(--${color}-100);
    }
  }
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
      return `/* #region ${color.toUpperCase()} */
.borderless:not(.disabled) {
  &.${color} {
    color: var(--${color}-500);

    &.active {
      animation: clicked-${color} ease-in-out 750ms 0s 1 normal both;
    }
  }
}

input.borderless:not(.disabled),
iframe.borderless:not(.disabled) {
  &.${color} {
    &:focus,
    &.focused {
      border-color: var(--${customFocusColor});
      box-shadow: 0 0 0 3.5px rgba(var(--${customFocusColor}-rgb), 0.25);
    }
  }
}

button.borderless:not(.disabled) {
  &.${color} { 
    &:hover,
    &:focus {
      background-color: var(--${color}-500);
      color: var(--white)
    }
  }
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
    box-shadow: 0 0 0 0px var(--${color}-500);
  }
  50% {
    box-shadow: 0 0 0 5px var(--${color}-100);
  }
  100% {
    box-shadow: 0 0 0 7.5px transparent;
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
_Input_SwitchCss();

_Variant_FilledCss();
_Variant_SurfaceCss();
_Variant_OutlinedCss();
_Variant_DashedCss();
_Variant_BorderlessCss();

_Animation_Css();
