import { PropsWithChildren } from "react";
import { Numbers } from "./Numbers";

export function Result(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Numbers
        style={{
          padding: "3rem",
        }}
        {...props}
      >
        {props.children}
      </Numbers>
    </div>
  );
}
