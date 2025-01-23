"use client";

import React from "react";
import "../../../assets/css/components/feedback/alert/alert.css";
import IProps from "./IProps";

const Alert: React.FC<IProps> = ({ children, message, status = "primary", border = { radius: "sm" }, emphasize }) => {
  // refs
  let _className = "ar-alert";

  // status
  if (status) _className += ` ${status}`;

  // border
  _className += ` border-style-solid`;
  _className += ` border-radius-${border.radius}`;

  const formattedTags = (message: string) => {
    // TODO: Şuan için sadece transparent olan alert tiplerinde çalışmakta.
    // TODO: Bu konu hakkında düşünüp karar verilecek.
    if (!emphasize) return message;

    let _lowerCaseMessage = message.toLocaleLowerCase();

    return emphasize.reduce((currentMessage, emphasize) => {
      let _lowerCaseEmphasize = emphasize.toLocaleLowerCase();
      let startIndex = _lowerCaseMessage.indexOf(_lowerCaseEmphasize);

      while (startIndex !== -1) {
        const endIndex = startIndex + emphasize.length;

        const firstValue = currentMessage.substring(0, startIndex);
        const originalTag = currentMessage.substring(startIndex, endIndex);
        const lastValue = currentMessage.substring(endIndex);

        currentMessage = `${firstValue} <span class="ar-alert-tag">${originalTag}</span> ${lastValue}`;

        // Update the lowerCaseMessage to reflect the change
        _lowerCaseMessage = currentMessage.toLocaleLowerCase();

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

    if (isSubMessage) className += "sub-message";
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
    <div className={_className}>
      {message ? (
        Array.isArray(message) ? (
          createList(message)
        ) : (
          <p dangerouslySetInnerHTML={{ __html: formattedTags(cleanMessage(message)) ?? "" }}></p>
        )
      ) : (
        children
      )}
    </div>
  );
};

export default Alert;
