"use client";

import React, { useRef } from "react";
import { Props } from "./Types";
import "../../assest/css/alert/alert.css";

const Alert: React.FC<Props> = ({ message, type, border = true, emphasize }) => {
  // refs
  let _className = useRef<string>("ar-alert").current;

  // methods
  const className = () => {
    if (type) _className += ` ${type}`;
    if (border) _className += ` ${type}-border`;

    return _className;
  };

  const formattedTags = (message: string) => {
    // TODO: Şuan için sadece transparent olan alert tiplerinde çalışmakta.
    // TODO: Bu konu hakkında düşünüp karar verilecek.
    if (!emphasize || type !== "transparent") return message;

    let _lowerCaseMessage = message.toLowerCase();

    return emphasize.reduce((currentMessage, emphasize) => {
      // TODO: ...
      // if (['""', " "].includes(emphasize)) return currentMessage;

      let _lowerCaseEmphasize = emphasize.toLowerCase();
      let startIndex = _lowerCaseMessage.indexOf(_lowerCaseEmphasize);

      while (startIndex !== -1) {
        const endIndex = startIndex + emphasize.length;

        const firstValue = currentMessage.substring(0, startIndex);
        const originalTag = currentMessage.substring(startIndex, endIndex);
        const lastValue = currentMessage.substring(endIndex);

        currentMessage = `${firstValue} <span class="ar-alert-tag">${originalTag}</span> ${lastValue}`;

        // Update the lowerCaseMessage to reflect the change
        _lowerCaseMessage = currentMessage.toLowerCase();

        // Find the next occurrence of the tag
        startIndex = _lowerCaseMessage.indexOf(
          _lowerCaseEmphasize,
          startIndex + `<span class="ar-alert-tag">${originalTag}</span>`.length
        );
      }

      return currentMessage;
    }, message);
  };

  const createList = (message: any, isSubMessage?: boolean) => {
    let className: string = "";

    if (isSubMessage) className += "subMessage";
    else className += "message";

    return (
      <ul>
        {Array.isArray(message)
          ? message.map((messageItem, index) => (
              <li key={index} className={className}>
                {Array.isArray(messageItem) ? (
                  createList(messageItem, true)
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formattedTags(cleanMessage(messageItem)) ?? "",
                    }}
                  ></div>
                )}
              </li>
            ))
          : message}
      </ul>
    );
  };

  /**
   *
   * @param message Yalnızca alfanümerik karakterleri (harfler ve sayılar) ve boşlukları tutar.
   * @returns
   */
  const cleanMessage = (message: string) => message.replace(/<\/?[^>]+>/g, "");

  return (
    <div className={className()}>
      {Array.isArray(message) ? (
        createList(message)
      ) : (
        <p dangerouslySetInnerHTML={{ __html: formattedTags(cleanMessage(message)) ?? "" }}></p>
      )}
    </div>
  );
};

export default Alert;
