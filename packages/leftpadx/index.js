export default function leftpadx(str, len, ch = ' ') { str = String(str); while (str.length < len) str = ch + str; return str; }
