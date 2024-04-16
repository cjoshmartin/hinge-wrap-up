import moment, { MomentInput } from "moment";
import { useMemo } from "react";
import styles from './header.module.css'

interface HeaderProps {
  username: string;
  startDate: MomentInput;
  endDate: MomentInput;
  image: string;
  title?: string;
}


export default function Header(props: HeaderProps) {
  const startDate = useMemo(() => moment(props.startDate), [props.startDate]);
  const endDate = useMemo(() => moment(props.endDate), [props.endDate]);
  return (
    <div>
      <div className={styles.container}>
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        {props.image && (
          <img
            src={props.image}
            alt=""
            width={100}
            height={150}
            className={styles.profileImg}
          />
        )}
        <div className={styles.innerContainer}>
          <h2
            style={{
              marginBottom: "0",
            }}
          >
            {props.username}'s Hinge Wrap {props.title && `- ${props.title}`}
          </h2>
        </div>
      </div>
      <div className={styles.datesContainer}>
        <i>
          <small>
            {startDate.format("LL")} to {endDate.format("LL")} (
            {endDate.diff(startDate, "months")} Months)
          </small>
        </i>
      </div>
    </div>
  );
}
