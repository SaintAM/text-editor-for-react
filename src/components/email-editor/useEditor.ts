import { useRef, useState } from "react";
import { TStyle, applyStyle } from "./apply-style";

export function useEditor() {
  const [text, setText] = useState(``);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const ref = useRef<HTMLTextAreaElement | null>(null);

  const updateSelection = () => {
    if (!ref.current) return;
    setSelectionStart(ref.current.selectionStart);
    setSelectionEnd(ref.current.selectionEnd);
  };

  const applyFormat = (type: TStyle) => {
    const selectedText = text.substring(selectionStart, selectionEnd); // выделенный текст

    if (!selectedText) return;

    const before = text.substring(0, selectionStart); // текст до выделенного фрагмента
    const after = text.substring(selectionEnd); // текст после выделенного фрагмента

    setText(before + applyStyle(type, selectedText) + after);
  };
  return {
    updateSelection,
    applyFormat,
    setText,
    text,
    ref,
  };
}
