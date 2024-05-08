import parse from "html-react-parser";
import { Bold, Eraser, Italic, Underline } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailService } from "../../services/email.service";
import { useEditor } from "./useEditor";
import styles from "./EmailEditor.module.scss";

export function EmailEditor() {
  const { text, applyFormat, updateSelection, setText, ref } = useEditor();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create email"],
    mutationFn: () => emailService.sendEmails(text),
    onSuccess() {
      setText("");
      queryClient.refetchQueries({ queryKey: ["email list"] });
    },
  });

  return (
    <div>
      <h1>Email editor</h1>
      <div className={styles.card}>
        <textarea
          className={styles.editor}
          spellCheck="false"
          onSelect={updateSelection}
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
        >
          {text}
        </textarea>
        <div className={styles.actions}>
          <div className={styles.tools}>
            <button onClick={() => setText("")}>
              <Eraser size={17} />
            </button>
            <button onClick={() => applyFormat("bold")}>
              <Bold size={17} />
            </button>
            <button onClick={() => applyFormat("italic")}>
              <Italic size={17} />
            </button>
            <button onClick={() => applyFormat("underline")}>
              <Underline size={17} />
            </button>
          </div>
          <button disabled={isPending} onClick={() => mutate()}>
            Send new
          </button>
        </div>
      </div>
      {text && <div className={styles.preview}>{parse(text)}</div>}
    </div>
  );
}
