import { PropsWithChildren } from "react";
import { Numbers } from "../Numbers";
import styles from './contentArea.module.css'

interface ContentAreaProps {
  title: string;
  isReversed?: boolean;
  isPurple?: boolean
  style?: any;
}

export default function ContentArea(props: PropsWithChildren<ContentAreaProps>) {
  return (
    <div
    className={styles.container}
      style={{
        flexDirection: props.isReversed ? "row-reverse" : "row",
        backgroundColor: props.isPurple ? "#614051" :"#000",
        ...props.style,
      }}
    >
      <h3 className={styles.header} >
        {props.title}
      </h3>
      <Numbers
        className={styles.result}
        isPurple={props.isPurple}
      >
        {props.children}
      </Numbers>
    </div>
  );
}
