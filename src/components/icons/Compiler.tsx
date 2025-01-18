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
          default:
            return null;
        }
      case "bulk":
        switch (icon) {
          case "Drive":
            return (
              <>
                <path
                  opacity=".4"
                  d="M16.19 2H7.82C4.18 2 2.01 4.17 2.01 7.81v8.37c0 3.64 2.17 5.81 5.81 5.81h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2Z"
                  fill={this._fill}
                ></path>
                <path
                  d="M6 9c-.41 0-.75-.34-.75-.75v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75ZM10 9c-.41 0-.75-.34-.75-.75v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75ZM6 18.75c-.41 0-.75-.34-.75-.75v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75ZM10 18.75c-.41 0-.75-.34-.75-.75v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75ZM18 8h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75S18.41 8 18 8ZM18 17.75h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75ZM22 11.25H2v1.5h20v-1.5Z"
                  fill={this._fill}
                ></path>
              </>
            );
          case "Folder":
            return (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 11.071v5.58c0 2.95-2.4 5.35-5.35 5.35h-9.3c-2.95 0-5.35-2.4-5.35-5.35v-7.21h19.74c.15.45.23.91.25 1.4.01.07.01.16.01.23Z"
                    fill={this._fill}
                  ></path>
                  <path
                    opacity=".4"
                    d="M21.74 9.44H2V6.42C2 3.98 3.98 2 6.42 2h2.33c1.63 0 2.14.53 2.79 1.4l1.4 1.86c.31.41.35.47.93.47h2.79c2.37-.01 4.39 1.55 5.08 3.71Z"
                    fill={this._fill}
                  ></path>
                </svg>
              </>
            );

          case "Upload":
            return (
              <>
                <path
                  d="M20.5 10.19h-2.89c-2.37 0-4.3-1.93-4.3-4.3V3c0-.55-.45-1-1-1H8.07C4.99 2 2.5 4 2.5 7.57v8.86C2.5 20 4.99 22 8.07 22h7.86c3.08 0 5.57-2 5.57-5.57v-5.24c0-.55-.45-1-1-1Z"
                  opacity=".4"
                  fill={this._fill}
                ></path>
                <path
                  d="M15.8 2.21c-.41-.41-1.12-.13-1.12.44v3.49c0 1.46 1.24 2.67 2.75 2.67.95.01 2.27.01 3.4.01.57 0 .87-.67.47-1.07-1.44-1.45-4.02-4.06-5.5-5.54ZM11.53 12.47l-2-2c-.01-.01-.02-.01-.02-.02a.855.855 0 0 0-.22-.15h-.02c-.08-.03-.16-.04-.24-.05h-.08c-.06 0-.13.02-.19.04-.03.01-.05.02-.07.03-.08.04-.16.08-.22.15l-2 2c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0l.72-.72V17c0 .41.34.75.75.75s.75-.34.75-.75v-4.19l.72.72c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06Z"
                  fill={this._fill}
                ></path>
              </>
            );
          case "Image":
            return (
              <>
                <path
                  opacity=".4"
                  d="m22.019 16.82-3.13-7.32c-.57-1.34-1.42-2.1-2.39-2.15-.96-.05-1.89.62-2.6 1.9l-1.9 3.41c-.4.72-.97 1.15-1.59 1.2-.63.06-1.26-.27-1.77-.92l-.22-.28c-.71-.89-1.59-1.32-2.49-1.23-.9.09-1.67.71-2.18 1.72l-1.73 3.45c-.62 1.25-.56 2.7.17 3.88.73 1.18 2 1.89 3.39 1.89h12.76c1.34 0 2.59-.67 3.33-1.79.76-1.12.88-2.53.35-3.76Z"
                  fill={this._fill}
                ></path>
                <path d="M6.97 8.381a3.38 3.38 0 1 0 0-6.76 3.38 3.38 0 0 0 0 6.76Z" fill={this._fill}></path>
              </>
            );
          case "Trash":
            return (
              <>
                <path
                  d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
                  fill={this._fill}
                ></path>
                <path
                  opacity=".399"
                  d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
                  fill={this._fill}
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
                  fill={this._fill}
                ></path>
              </>
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
