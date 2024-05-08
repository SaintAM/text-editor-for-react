import { EmailEditor } from "../email-editor/EmailEditor";
import { EmailList } from "../email-list/EmailList";
import styles from "./Home.module.scss";

export function Home() {
  return (
    <div className={styles.grid}>
      <EmailEditor />
      <EmailList />
    </div>
  );
}
