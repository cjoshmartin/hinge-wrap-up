import { PropsWithChildren } from "react";

export function PercentageFact(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: props.isReversed ? "row-reverse" : "row",
        alignItems: "center",
        padding: '1rem',
        backgroundColor: "#614051",
      }}
    >
      <div
        style={{
          color: "#fff",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
