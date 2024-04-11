import { PropsWithChildren } from "react";
import { Numbers } from "./Numbers";

interface ContentAreaProps {
  title: string;
  isReversed?: boolean;
  isPurple?: boolean
  style?: any;
}

export function ContentArea(props: PropsWithChildren<ContentAreaProps>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: props.isReversed ? "row-reverse" : "row",
        margin: "18px",
        marginBottom: 0,
        alignContent: "space-between",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: props.isPurple ? "#614051" :"#000",
        ...props.style,
      }}
    >
      <h2
        style={{
          flexGrow: "2",
          color: "#FFF",
          padding: "3rem",
        }}
      >
        {props.title}
      </h2>
      <Numbers
        style={{
          flexGrow: "3",
          whiteSpace: "nowrap",
        }}
        isPurple={props.isPurple}
      >
        {props.children}
      </Numbers>
    </div>
  );
}
