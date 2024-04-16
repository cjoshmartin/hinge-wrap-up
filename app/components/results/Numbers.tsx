import { PropsWithChildren } from "react";

export function Numbers(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: props.isPurple ? "#614051" :"#000",
        color: "#fff",
        textAlign: 'right',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
