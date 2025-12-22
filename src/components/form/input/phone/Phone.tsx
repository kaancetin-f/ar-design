"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Input from "..";
import IProps from "./IProps";
import Select from "../../select";
import { Option } from "../../../../libs/types";
import PhoneMask from "../../../../libs/infrastructure/shared/PhoneMask";

const options = [
  // #---- TR
  { text: "🇹🇷 (+90)", value: "+90" },
  // #---- OTHER
  { text: "🇦🇫 (+93)", value: "+93" },
  { text: "🇦🇱 (+355)", value: "+355" },
  { text: "🇩🇿 (+213)", value: "+213" },
  { text: "🇦🇸 (+1)", value: "+1" },
  { text: "🇦🇩 (+376)", value: "+376" },
  { text: "🇦🇴 (+244)", value: "+244" },
  { text: "🇦🇮 (+1)", value: "+1" },
  { text: "🇦🇬 (+1)", value: "+1" },
  { text: "🇦🇷 (+54)", value: "+54" },
  { text: "🇦🇲 (+374)", value: "+374" },
  { text: "🇦🇼 (+297)", value: "+297" },
  { text: "🇦🇺 (+61)", value: "+61" },
  { text: "🇦🇹 (+43)", value: "+43" },
  { text: "🇦🇿 (+994)", value: "+994" },
  { text: "🇧🇸 (+1)", value: "+1" },
  { text: "🇧🇭 (+973)", value: "+973" },
  { text: "🇧🇩 (+880)", value: "+880" },
  { text: "🇧🇧 (+1)", value: "+1" },
  { text: "🇧🇾 (+375)", value: "+375" },
  { text: "🇧🇪 (+32)", value: "+32" },
  { text: "🇧🇿 (+501)", value: "+501" },
  { text: "🇧🇯 (+229)", value: "+229" },
  { text: "🇧🇲 (+1)", value: "+1" },
  { text: "🇧🇹 (+975)", value: "+975" },
  { text: "🇧🇴 (+591)", value: "+591" },
  { text: "🇧🇦 (+387)", value: "+387" },
  { text: "🇧🇼 (+267)", value: "+267" },
  { text: "🇧🇷 (+55)", value: "+55" },
  { text: "🇧🇳 (+673)", value: "+673" },
  { text: "🇧🇬 (+359)", value: "+359" },
  { text: "🇧🇫 (+226)", value: "+226" },
  { text: "🇧🇮 (+257)", value: "+257" },
  { text: "🇰🇭 (+855)", value: "+855" },
  { text: "🇨🇲 (+237)", value: "+237" },
  { text: "🇨🇦 (+1)", value: "+1" },
  { text: "🇨🇻 (+238)", value: "+238" },
  { text: "🇨🇫 (+236)", value: "+236" },
  { text: "🇹🇩 (+235)", value: "+235" },
  { text: "🇨🇱 (+56)", value: "+56" },
  { text: "🇨🇳 (+86)", value: "+86" },
  { text: "🇨🇴 (+57)", value: "+57" },
  { text: "🇰🇲 (+269)", value: "+269" },
  { text: "🇨🇬 (+242)", value: "+242" },
  { text: "🇨🇷 (+506)", value: "+506" },
  { text: "🇭🇷 (+385)", value: "+385" },
  { text: "🇨🇺 (+53)", value: "+53" },
  { text: "🇨🇾 (+357)", value: "+357" },
  { text: "🇨🇿 (+420)", value: "+420" },
  { text: "🇩🇰 (+45)", value: "+45" },
  { text: "🇩🇯 (+253)", value: "+253" },
  { text: "🇩🇲 (+1)", value: "+1" },
  { text: "🇩🇴 (+1)", value: "+1" },
  { text: "🇪🇨 (+593)", value: "+593" },
  { text: "🇪🇬 (+20)", value: "+20" },
  { text: "🇸🇻 (+503)", value: "+503" },
  { text: "🇪🇪 (+372)", value: "+372" },
  { text: "🇪🇹 (+251)", value: "+251" },
  { text: "🇫🇯 (+679)", value: "+679" },
  { text: "🇫🇮 (+358)", value: "+358" },
  { text: "🇫🇷 (+33)", value: "+33" },
  { text: "🇬🇦 (+241)", value: "+241" },
  { text: "🇬🇲 (+220)", value: "+220" },
  { text: "🇬🇪 (+995)", value: "+995" },
  { text: "🇩🇪 (+49)", value: "+49" },
  { text: "🇬🇭 (+233)", value: "+233" },
  { text: "🇬🇷 (+30)", value: "+30" },
  { text: "🇬🇩 (+1)", value: "+1" },
  { text: "🇬🇹 (+502)", value: "+502" },
  { text: "🇬🇳 (+224)", value: "+224" },
  { text: "🇬🇼 (+245)", value: "+245" },
  { text: "🇬🇾 (+592)", value: "+592" },
  { text: "🇭🇹 (+509)", value: "+509" },
  { text: "🇭🇳 (+504)", value: "+504" },
  { text: "🇭🇰 (+852)", value: "+852" },
  { text: "🇭🇺 (+36)", value: "+36" },
  { text: "🇮🇸 (+354)", value: "+354" },
  { text: "🇮🇳 (+91)", value: "+91" },
  { text: "🇮🇩 (+62)", value: "+62" },
  { text: "🇮🇷 (+98)", value: "+98" },
  { text: "🇮🇶 (+964)", value: "+964" },
  { text: "🇮🇪 (+353)", value: "+353" },
  { text: "🇮🇱 (+972)", value: "+972" },
  { text: "🇮🇹 (+39)", value: "+39" },
  { text: "🇨🇮 (+225)", value: "+225" },
  { text: "🇯🇲 (+1)", value: "+1" },
  { text: "🇯🇵 (+81)", value: "+81" },
  { text: "🇯🇴 (+962)", value: "+962" },
  { text: "🇰🇿 (+7)", value: "+7" },
  { text: "🇰🇪 (+254)", value: "+254" },
  { text: "🇰🇮 (+686)", value: "+686" },
  { text: "🇰🇼 (+965)", value: "+965" },
  { text: "🇰🇬 (+996)", value: "+996" },
  { text: "🇱🇦 (+856)", value: "+856" },
  { text: "🇱🇻 (+371)", value: "+371" },
  { text: "🇱🇧 (+961)", value: "+961" },
  { text: "🇱🇸 (+266)", value: "+266" },
  { text: "🇱🇷 (+231)", value: "+231" },
  { text: "🇱🇾 (+218)", value: "+218" },
  { text: "🇱🇹 (+370)", value: "+370" },
  { text: "🇱🇺 (+352)", value: "+352" },
  { text: "🇲🇰 (+389)", value: "+389" },
  { text: "🇲🇬 (+261)", value: "+261" },
  { text: "🇲🇼 (+265)", value: "+265" },
  { text: "🇲🇾 (+60)", value: "+60" },
  { text: "🇲🇻 (+960)", value: "+960" },
  { text: "🇲🇱 (+223)", value: "+223" },
  { text: "🇲🇹 (+356)", value: "+356" },
  { text: "🇲🇷 (+222)", value: "+222" },
  { text: "🇲🇺 (+230)", value: "+230" },
  { text: "🇲🇽 (+52)", value: "+52" },
  { text: "🇫🇲 (+691)", value: "+691" },
  { text: "🇲🇩 (+373)", value: "+373" },
  { text: "🇲🇨 (+377)", value: "+377" },
  { text: "🇲🇳 (+976)", value: "+976" },
  { text: "🇲🇪 (+382)", value: "+382" },
  { text: "🇲🇦 (+212)", value: "+212" },
  { text: "🇲🇿 (+258)", value: "+258" },
  { text: "🇲🇲 (+95)", value: "+95" },
  { text: "🇳🇦 (+264)", value: "+264" },
  { text: "🇳🇷 (+674)", value: "+674" },
  { text: "🇳🇵 (+977)", value: "+977" },
  { text: "🇳🇱 (+31)", value: "+31" },
  { text: "🇳🇿 (+64)", value: "+64" },
  { text: "🇳🇮 (+505)", value: "+505" },
  { text: "🇳🇪 (+227)", value: "+227" },
  { text: "🇳🇬 (+234)", value: "+234" },
  { text: "🇳🇺 (+683)", value: "+683" },
  { text: "🇰🇵 (+850)", value: "+850" },
  { text: "🇲🇵 (+1)", value: "+1" },
  { text: "🇳🇴 (+47)", value: "+47" },
  { text: "🇴🇲 (+968)", value: "+968" },
  { text: "🇵🇰 (+92)", value: "+92" },
  { text: "🇵🇼 (+680)", value: "+680" },
  { text: "🇵🇦 (+507)", value: "+507" },
  { text: "🇵🇬 (+675)", value: "+675" },
  { text: "🇵🇾 (+595)", value: "+595" },
  { text: "🇵🇪 (+51)", value: "+51" },
  { text: "🇵🇭 (+63)", value: "+63" },
  { text: "🇵🇱 (+48)", value: "+48" },
  { text: "🇵🇹 (+351)", value: "+351" },
  { text: "🇶🇦 (+974)", value: "+974" },
  { text: "🇷🇴 (+40)", value: "+40" },
  { text: "🇷🇺 (+7)", value: "+7" },
  { text: "🇷🇼 (+250)", value: "+250" },
  { text: "🇰🇳 (+1)", value: "+1" },
  { text: "🇱🇨 (+1)", value: "+1" },
  { text: "🇻🇨 (+1)", value: "+1" },
  { text: "🇼🇸 (+685)", value: "+685" },
  { text: "🇸🇲 (+378)", value: "+378" },
  { text: "🇸🇹 (+239)", value: "+239" },
  { text: "🇸🇦 (+966)", value: "+966" },
  { text: "🇸🇳 (+221)", value: "+221" },
  { text: "🇷🇸 (+381)", value: "+381" },
  { text: "🇸🇨 (+248)", value: "+248" },
  { text: "🇸🇱 (+232)", value: "+232" },
  { text: "🇸🇬 (+65)", value: "+65" },
  { text: "🇸🇰 (+421)", value: "+421" },
  { text: "🇸🇮 (+386)", value: "+386" },
  { text: "🇸🇧 (+677)", value: "+677" },
  { text: "🇸🇴 (+252)", value: "+252" },
  { text: "🇿🇦 (+27)", value: "+27" },
  { text: "🇰🇷 (+82)", value: "+82" },
  { text: "🇸🇸 (+211)", value: "+211" },
  { text: "🇪🇸 (+34)", value: "+34" },
  { text: "🇱🇰 (+94)", value: "+94" },
  { text: "🇸🇩 (+249)", value: "+249" },
  { text: "🇸🇷 (+597)", value: "+597" },
  { text: "🇸🇪 (+46)", value: "+46" },
  { text: "🇨🇭 (+41)", value: "+41" },
  { text: "🇸🇾 (+963)", value: "+963" },
  { text: "🇹🇯 (+992)", value: "+992" },
  { text: "🇹🇿 (+255)", value: "+255" },
  { text: "🇹🇭 (+66)", value: "+66" },
  { text: "🇹🇱 (+670)", value: "+670" },
  { text: "🇹🇬 (+228)", value: "+228" },
  { text: "🇹🇴 (+676)", value: "+676" },
  { text: "🇹🇹 (+1)", value: "+1" },
  { text: "🇹🇳 (+216)", value: "+216" },
  { text: "🇹🇲 (+993)", value: "+993" },
  { text: "🇹🇻 (+688)", value: "+688" },
  { text: "🇺🇬 (+256)", value: "+256" },
  { text: "🇺🇦 (+380)", value: "+380" },
  { text: "🇦🇪 (+971)", value: "+971" },
  { text: "🇬🇧 (+44)", value: "+44" },
  { text: "🇺🇸 (+1)", value: "+1" },
  { text: "🇺🇾 (+598)", value: "+598" },
  { text: "🇺🇿 (+998)", value: "+998" },
  { text: "🇻🇺 (+678)", value: "+678" },
  { text: "🇻🇦 (+379)", value: "+379" },
  { text: "🇻🇪 (+58)", value: "+58" },
  { text: "🇻🇳 (+84)", value: "+84" },
  { text: "🇾🇪 (+967)", value: "+967" },
  { text: "🇿🇲 (+260)", value: "+260" },
  { text: "🇿🇼 (+263)", value: "+263" },
];

const Phone: React.FC<IProps> = ({
  variant,
  color,
  name,
  values,
  onSelected,
  onChange,
  placeholder,
  validation,
  disabled,
}: IProps) => {
  // refs
  const _input = useRef<HTMLInputElement | null>(null);

  // states
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>("");
  const [selected, setSelected] = useState<Option | undefined>(undefined);

  // methods
  const handleClick = () => {
    const input = _input.current;

    if (!input) return;

    const caret = input.selectionStart ?? 0;
    input.setSelectionRange(caret, caret + 1);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { value } = event.target;

    setValue(value);
    onChange?.({
      ...event,
      target: {
        ...event.target,
        name,
        value: value.replace(/\D/g, ""),
      },
    });
  };

  // useEffects
  useEffect(() => {
    setValue(values.value);
    setSelected(options.find((option) => option.value === values.option));
  }, [values]);

  return (
    <div className="ar-input-phone-wrapper">
      <Select
        style={{ width: 130 }}
        variant="outlined"
        color="light"
        options={options.sort((a, b) => Number(a.value.replace("+", "")) - Number(b.value.replace("+", "")))}
        value={selected}
        onChange={(option) => {
          onSelected(option);
          setSelected(option);
        }}
      />

      <Input
        ref={_input}
        name={name}
        variant={variant}
        color={color}
        value={PhoneMask.FormatByMask(selected?.value as string, _value as string)}
        type="tel"
        inputMode="decimal"
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        validation={validation}
        disabled={disabled}
      />
    </div>
  );
};

export default Phone;
