import styles from './header.module.scss';

export function Header(): JSX.Element {
  return (
    <header className={styles.Container}>
      <img src="assets/Logo.svg" alt="Logotipo spacetraveling" />
    </header>
  );
}
