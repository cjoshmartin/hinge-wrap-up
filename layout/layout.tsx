import { Layout as _Layout, ConfigProvider, Space, theme } from "antd";
import Nav from "../components/Nav";
const { Header, Content } = _Layout;

const headerStyle: React.CSSProperties = {
  padding: 0,
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

import type { ThemeConfig } from 'antd';

const customTheme: ThemeConfig = {
  token: {
    fontSize: 16,
      "colorPrimary": "#614051",
      "colorInfo": "#614051",
      "colorBgBase": "#ffffff",
      "colorTextBase": "#000000"
  },
};

export default function Layout(props: any){
    return (
      <ConfigProvider theme={customTheme}>
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <_Layout>
        <Header style={headerStyle}>
          <Nav />
        </Header>
        <Content style={contentStyle}>
            {props.children}
        </Content>
      </_Layout>
    </Space>
    </ConfigProvider>
    )
}