import Link from "next/link";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
export function Nav() {
  return (
    <nav className={styles.module}>
      <ul>
        <li>
          <Link href="/">
            <a>Search User Repos</a>
          </Link>
        </li>
        <li>
          <Link href="/my">
            <a>My Repos</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
