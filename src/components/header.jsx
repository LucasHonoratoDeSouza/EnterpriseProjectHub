import styles from './header.module.css'
import { FaCog } from 'react-icons/fa';

function Header() {
    return (
        <div className={styles.header}>
            <h3 className={styles.tri}>▽</h3>
            <h3 className={styles.EPH}>EnterpriseProjectHub</h3>
            <FaCog className={styles.config}/>
        </div>
    )
}

export default Header