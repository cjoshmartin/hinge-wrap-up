import moment, { MomentInput } from "moment";
import { useMemo } from "react";

interface HeaderProps {
  username: string;
  startDate: MomentInput;
  endDate: MomentInput;
  image: string;
  title?: string;
}


export function Header(props: HeaderProps) {
  const startDate = useMemo(() => moment(props.startDate), [props.startDate]);
  const endDate = useMemo(() => moment(props.endDate), [props.endDate]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: '1rem',
        padding: '1rem'
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      {props.image && <img
        src={props.image}
        alt="" width={100} height={100}
        style={{
          borderRadius: '3rem'
        }} />
      }
      <div 
        style={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center'
        }}
      >
        <h2
          style={{
            marginBottom: "0",
          }}
        >
          {props.username}'s Hinge Wrap {props.title &&`- ${props.title}`}
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <p>{startDate.format("LL")}</p>
          <p>-</p>
          <p>
            {endDate.format("LL")} ({endDate.diff(startDate, "months")} Months)
          </p>
        </div>
      </div>
    </div>
  );
}
