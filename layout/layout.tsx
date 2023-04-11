import { Layout as _Layout, Space } from "antd";
import Nav from "../components/Nav";
const { Header, Content } = _Layout;

const headerStyle: React.CSSProperties = {
  backgroundColor: "inherit",
  padding: 0,
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Layout(props: any){
    return (
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
    )
}