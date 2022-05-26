import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';
import logoSpacetravelin from '../../../public/Logo.svg';
import { ButtonSignIn } from '../ButtonSignIn';

export function Header(): JSX.Element {
  return (
    <header className={styles.Container}>
      <Link href="/">
        <a>
          <Image
            src={logoSpacetravelin}
            width={250}
            alt="Logotipo spacetraveling"
          />
        </a>
      </Link>

      <ButtonSignIn />
    </header>
  );
}
