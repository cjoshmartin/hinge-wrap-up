import { Menu } from "antd";
import Link from "next/link";
import styles from './nav.module.css'
export default function Nav({setMatchData}: any) {
  return (
    <Menu mode="horizontal">
      <h1 className={styles.h1} onClick={() => setMatchData(undefined)}>Hinge Trends</h1>
      {/* <Menu.Item onClick={() => setMatchData(undefined)} key="Home">
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item key={"About"}>
        <Link href="/about">About</Link>
      </Menu.Item>
      <Menu.Item key={'download'}>
        <Link href="/how-to-download">How to download Your Data</Link>
      </Menu.Item> */}
    </Menu>
  );
}
