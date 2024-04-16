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
        // width: '100%'
      }}
    >
      <div
        style={{
          color: "#fff",
          'textAlign': 'center',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
