import { PropsWithChildren } from "react";

export function PercentageFact(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        padding: '0.5rem',
        backgroundColor: "#614051",
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
