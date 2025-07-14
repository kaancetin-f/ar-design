import React from "react";
import { Icons, IconVariants } from "../../libs/types";

class Icon {
  private _fill?: string;
  private _stroke?: string;
  private _strokeWidth?: number;
  private _startIndex: number = 4;
  private _centerIndex: number = 12;
  private _finishIndex: number = 20;

  constructor(fill?: string, stroke?: string, strokeWidth?: number) {
    this._fill = fill;
    this._stroke = stroke;
    this._strokeWidth = strokeWidth;
  }

  public Compiler = (variant: IconVariants, icon: Icons) => {
    switch (variant) {
      case "linear":
        switch (icon) {
          case "Add":
            return (
              <>
                <line
                  fill={this._fill}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  x1="12"
                  x2="12"
                  y1="19"
                  y2="5"
                ></line>
                <line
                  fill={this._fill}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  x1="5"
                  x2="19"
                  y1="12"
                  y2="12"
                ></line>
              </>
            );
          case "ArrowLeft":
            return (
              <path
                d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
                stroke={this._stroke}
                strokeWidth={this._strokeWidth}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            );
          case "ArrowRight":
            return (
              <path
                d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
                stroke={this._stroke}
                strokeWidth={this._strokeWidth}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            );
          case "CloseSquare":
            return (
              <path
                d="m9.17 14.83 5.66-5.66M14.83 14.83 9.17 9.17M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
                stroke={this._stroke}
                strokeWidth={this._strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          case "CloseCircle":
            return (
              <path
                d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
                stroke={this._stroke}
                strokeWidth={this._strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            );
          case "Import":
            return (
              <>
                <path
                  d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </>
            );
          case "Document":
            return (
              <>
                <path
                  d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </>
            );
          case "Bold":
            return (
              <>
                <path
                  d="M6 4h8a4 4 0 0 1 0 8H6z"
                  stroke={this._stroke}
                  strokeWidth={Number(this._strokeWidth) + 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 12h9a4 4 0 0 1 0 8H6z"
                  stroke={this._stroke}
                  strokeWidth={Number(this._strokeWidth) + 1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Italic":
            return (
              <>
                <line
                  x1="19"
                  y1="4"
                  x2="10"
                  y2="4"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="14"
                  y1="20"
                  x2="5"
                  y2="20"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="15"
                  y1="4"
                  x2="9"
                  y2="20"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Underline":
            return (
              <>
                <path
                  d="M6 4v6a6 6 0 0 0 12 0V4"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4"
                  y1="20"
                  x2="20"
                  y2="20"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Upload":
            return (
              <>
                <path
                  d="M9 17v-6l-2 2M9 11l2 2"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Strikethrough":
            return (
              <>
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 4h12"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 20h12"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Success":
            return (
              <>
                <path
                  d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2h-4.2C9.4 2 8 3.4 8 6.9V8h3.1c3.5 0 4.9 1.4 4.9 4.9V16h1.1c3.5 0 4.9-1.4 4.9-4.9z"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17.1v-4.2C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9v4.2C2 20.6 3.4 22 6.9 22h4.2c3.5 0 4.9-1.4 4.9-4.9z"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.08 15l1.95 1.95 3.89-3.9"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "BulletList":
            return (
              <>
                <circle cx={3} cy={this._startIndex} r={2} fill="currentColor" />
                <circle cx={3} cy={this._centerIndex} r={2} fill="currentColor" />
                <circle cx={3} cy={this._finishIndex} r={2} fill="currentColor" />

                <line
                  x1="8"
                  y1={this._startIndex}
                  x2="20"
                  y2={this._startIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1={this._centerIndex}
                  x2="20"
                  y2={this._centerIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1={this._finishIndex}
                  x2="20"
                  y2={this._finishIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "NumberList":
            return (
              <>
                <text
                  x="1"
                  y={this._startIndex + 2}
                  fontSize="8"
                  fontFamily="Arial"
                  fill="currentColor"
                  stroke={this._stroke}
                  strokeWidth={Number(this._strokeWidth) - 1}
                >
                  1
                </text>
                <text
                  x="0"
                  y={this._centerIndex + 2}
                  fontSize="8"
                  fontFamily="Arial"
                  fill="currentColor"
                  stroke={this._stroke}
                  strokeWidth={Number(this._strokeWidth) - 1}
                >
                  2
                </text>
                <text
                  x="0"
                  y={this._finishIndex + 2}
                  fontSize="8"
                  fontFamily="Arial"
                  fill="currentColor"
                  stroke={this._stroke}
                  strokeWidth={Number(this._strokeWidth) - 1}
                >
                  3
                </text>

                <line
                  x1="8"
                  y1={this._startIndex}
                  x2="20"
                  y2={this._startIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1={this._centerIndex}
                  x2="20"
                  y2={this._centerIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1={this._finishIndex}
                  x2="20"
                  y2={this._finishIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "TextAlingLeft":
            return (
              <>
                <line
                  x1="4"
                  y1={this._startIndex}
                  x2="20"
                  y2={this._startIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4"
                  y1={this._centerIndex}
                  x2="16"
                  y2={this._centerIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4"
                  y1={this._finishIndex}
                  x2="20"
                  y2={this._finishIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "TextAlingCenter":
            return (
              <>
                <line
                  x1="6"
                  y1={this._startIndex}
                  x2="18"
                  y2={this._startIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4"
                  y1={this._centerIndex}
                  x2="20"
                  y2={this._centerIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="6"
                  y1={this._finishIndex}
                  x2="18"
                  y2={this._finishIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "TextAlingRight":
            return (
              <>
                <line
                  x1="4"
                  y1={this._startIndex}
                  x2="20"
                  y2={this._startIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="8"
                  y1={this._centerIndex}
                  x2="20"
                  y2={this._centerIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="4"
                  y1={this._finishIndex}
                  x2="20"
                  y2={this._finishIndex}
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Filter":
            return (
              <>
                {/* <path
                  d="M5.4 2.1h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3V19c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2V4.2c0-1.2.9-2.1 2-2.1ZM10.93 2.1 6 10"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path> */}

                <path
                  d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "TickCircle":
            return (
              <>
                <path
                  d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m7.75 12 2.83 2.83 5.67-5.66"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "Warning":
            return (
              <>
                <path
                  d="M12 7.75V13M2.92 8.58c0-1.12.6-2.16 1.57-2.73l5.94-3.43c.97-.56 2.17-.56 3.15 0l5.94 3.43c.97.56 1.57 1.6 1.57 2.73v6.84c0 1.12-.6 2.16-1.57 2.73l-5.94 3.43c-.97.56-2.17.56-3.15 0l-5.94-3.43a3.15 3.15 0 0 1-1.57-2.73v-2.76"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16.2v.1"
                  stroke={this._stroke}
                  strokeWidth={this._strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            );
          case "ExclamationCircle":
            return (
              <>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </>
            );
          default:
            return null;
        }
      case "fill":
        switch (icon) {
          case "CloudUpload":
            return (
              <path
                fillRule="evenodd"
                d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"
              />
            );
          case "Trash":
            return (
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            );
          case "Eye":
            return (
              <>
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </>
            );
          case "ExclamationDiamond":
            return (
              <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };
}

export default Icon;
