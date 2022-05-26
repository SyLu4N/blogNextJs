import styles from './footer.module.scss';

export function Footer(): JSX.Element {
  return (
    <p className={styles.footer}>
      Feito com ❤️ por
      <a
        href="https://github.com/SyLu4N/blogNextJs"
        target="_blank"
        rel="noreferrer"
      >
        Luan Simões
      </a>
    </p>
  );
}
