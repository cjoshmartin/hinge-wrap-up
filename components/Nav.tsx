import { Menu } from "antd";
import Link from "next/link";
export default function Nav() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/about">About</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/how-to-download">Download your Hinge Data</Link>
      </Menu.Item>
    </Menu>
  );
}
