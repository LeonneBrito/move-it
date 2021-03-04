import  Link from 'next/link'
import ThemeChanger from './ThemeChanger';
import { signOut } from 'next-auth/client'
import { FiHome, FiLogOut } from 'react-icons/fi';
import styles from '../styles/components/Sidebar.module.scss';

export function Sidebar() {

  return (
    <div className={styles.container}>
      <img src="logo-min.svg" alt="Move it" />
      <main>
        <Link href="/">
          <FiHome size={32} className={styles.isActive} />
        </Link>
        <ThemeChanger />
      </main>
      <footer>
       <a onClick={() => signOut()}><FiLogOut size={32} /></a>
      </footer>
    </div>
  );
}