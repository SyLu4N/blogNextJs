import { BsCreditCard2Front } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { FaLinkedinIn } from 'react-icons/fa';

import styles from './footer.module.scss';

export function Footer(): JSX.Element {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div>
          <h1>SyLu4N</h1>
          <p>Frontend Developer</p>
        </div>
        <nav>
          <a href="https://sylu4n.vercel.app/" target="_blank" rel="noreferrer">
            <BsCreditCard2Front />
            Portfolio
          </a>
          <a
            href="mailto:luaan.carlos@hotmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <BiSend />
            Contato
          </a>
          <a
            href="https://www.linkedin.com/in/luan-sim%C3%B5es-617492236/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
            LinkedIn
          </a>
        </nav>
      </div>
      <em>© Luan Simões. All right reserved</em>
    </footer>
  );
}
