class Replacer {
  public _code: React.RefObject<HTMLElement>;

  constructor(code: React.RefObject<HTMLElement>) {
    this._code = code;
  }

  public Jsx = (elements: string[]) => {
    if (this._code.current) this._code.current.innerHTML = "";

    elements.forEach((element) => {
      // Open Tag
      element = element.replace(
        /\[open\](.*?)\[\/open\]|\[close-slash\](.*?)\[\/close-slash\]/g,
        (_, p1, p2) => {
          return `<span>${p1 ?? p2}</span>`;
        }
      );

      // Close Tag
      element = element.replace(/\[close\](.*?)\[\/close\]/g, (_, p1) => {
        return `<span>${p1}</span>`;
      });

      // Tags
      element = element.replace(/\[tag\](.*?)\[\/tag\]/g, (_, p1) => {
        return `<span class="ar-tag">${p1}</span>`;
      });

      element = element.replace(/\[react-tag\](.*?)\[\/react-tag\]/g, (_, p1) => {
        return `<span class="ar-custom-tag">${p1}</span>`;
      });

      // Attributes
      element = element.replace(/\[attributes\](.*?)\[\/attributes\]/g, (_, p1) => {
        return `<span class="ar-attributes">${p1}</span>`;
      });

      // Attributes Key
      element = element.replace(/\[attribute-key\](.*?)\[\/attribute-key\]/g, (_, p1) => {
        return `<span class="ar-attribute-key">${p1}</span>`;
      });

      element = element.replace(/\[equal\](.*?)\[\/equal\]/g, (_, p1) => {
        return `<span>${p1}</span>`;
      });

      element = element.replace(/\[colon\](.*?)\[\/colon\]/g, (_, p1) => {
        return `<span>${p1}</span>`;
      });

      // Attributes Values
      element = element.replace(/\[string\](.*?)\[\/string\]/g, (_, p1) => {
        return `<span class="ar-string-value">"${p1}"</span>`;
      });
      element = element.replace(/\[number\](.*?)\[\/number\]/g, (_, p1) => {
        return `<span class="ar-number-value">${p1}</span>`;
      });

      element = element.replace(/\[boolean\](.*?)\[\/boolean\]/g, (_, p1) => {
        return `<span class="ar-boolean-value"><span>{</span>${p1}<span>}</span></span>`;
      });

      element = element.replace(/\[object\](.*?)\[\/object\]/g, (_, p1) => {
        return `<span class="ar-object-value"><span>{{</span> ${p1} <span>}}</span></span>`;
      });

      element = element.replace(/\[curly-bracket<\]/g, "<span class='ar-curly-bracket'>{</span>");
      element = element.replace(/\[curly-bracket>\]/g, "<span class='ar-curly-bracket'>}</span>");

      if (this._code.current)
        this._code.current.innerHTML += `<span class="ar-language">${element}</span>`;
    });
  };
}

export default Replacer;
