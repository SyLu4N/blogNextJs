import Link from 'next/link';

import styles from './header.module.scss';

export function Header(): JSX.Element {
  return (
    <header className={styles.Container}>
      <Link href="/">
        <a>
          <img src="Logo.svg" alt="Logotipo Spacetraveling." />
        </a>
      </Link>
    </header>
  );
}
