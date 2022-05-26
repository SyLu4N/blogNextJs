import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './loading.module.scss';

export function Loading(): JSX.Element {
  return <AiOutlineLoading3Quarters className={styles.loading} />;
}
