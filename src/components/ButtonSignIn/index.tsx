import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './ButtonSignIn.module.scss';

export function ButtonSignIn(): JSX.Element {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={styles.singInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.singInButton}
      onClick={() => signIn('github')}
    >
      <p>
        <FaGithub color="#eba417" />
      </p>
      <p>Login com GitHub</p>
    </button>
  );
}
