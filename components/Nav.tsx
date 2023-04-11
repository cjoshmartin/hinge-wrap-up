// import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
export default function Nav() {
  return (
    <Menu mode="horizontal">
      <Link href="/">
        <Menu.Item>Home</Menu.Item>
      </Link>
      <Link href="/about">
        <Menu.Item>About</Menu.Item>
      </Link>
      <Link href="/how-to-download">
        <Menu.Item>Download your Hinge Data</Menu.Item>
      </Link>
    </Menu>
  );
}
