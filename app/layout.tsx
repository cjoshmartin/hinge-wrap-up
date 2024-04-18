import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hinge Trends",
  description: "Look at the trends in your hinge data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider 
            theme={{
              token: {
                fontSize: 16,
                  "colorPrimary": "#614051",
                  "colorInfo": "#614051",
                  "colorBgBase": "#ffffff",
                  "colorTextBase": "#000000"
              },
            }}
          >
            {children}
            </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
