import styles from "./Navbar.module.css"
import { Capacitor } from "@capacitor/core"

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Web Monitor</h1>
      </div>

      <div className={styles.version}>
        Web Monitor v2.18.1
      </div>

    </header>
  )
}

export default Navbar
