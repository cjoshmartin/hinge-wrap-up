import { Button } from "antd";
import html2canvas from "html2canvas";
import moment, { MomentInput } from "moment";
import { PropsWithChildren, useMemo } from "react";

interface HeaderProps {
  username: string;
  startDate: MomentInput;
  endDate: MomentInput;
}

function Header(props: HeaderProps) {
  const startDate = useMemo(() => moment(props.startDate), [props.startDate]);
  const endDate = useMemo(() => moment(props.endDate), [props.endDate]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "0",
        }}
      >
        {props.username}'s Hinge Wrap
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
  );
}

interface ContentAreaProps {
  title: string;
  isReversed?: boolean;
  style?: any
}

function Numbers(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000000",
        color: "#fff",
        padding: "1rem 3rem",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}

function ContentArea(props: PropsWithChildren<ContentAreaProps>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: props.isReversed ? "row-reverse" : "row",
        gap: "5rem",
        margin: "18px",
        marginBottom: 0,
        alignContent: "space-between",
        justifyContent: "space-between",
        alignItems: "center",
        ...props.style
      }}
    >
      <h2
        style={{
          flexGrow: "2",
        }}
      >
        {props.title}
      </h2>
      <span
        style={{
          height: "8px",
          width: "100%",
          backgroundColor: "#000",
          flexGrow: "1",
        }}
      />
      <Numbers
        style={{
          flexGrow: "3",
          whiteSpace: "nowrap",
        }}
      >
        {props.children}
      </Numbers>
    </div>
  );
}

function PercentageFact(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: props.isReversed ? "row-reverse" : "row",
        alignItems: "center",
        margin: "18px 46px",
      }}
    >
      <div
        style={{
          backgroundColor: "#614051",
          color: "#fff",
          padding: "3rem",
          borderRadius: "100%",
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

function Result(props: PropsWithChildren<any>) {
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
      <Numbers>{props.children}</Numbers>
    </div>
  );
}

function Footer(props: any) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        margin: "0 18px",
        height: "100%",
      }}
    >
      <p>HingeWrapper.com</p>
      <p>Made by @cjoshmartin</p>
    </div>
  );
}

export default function Results(props: any) {
  function onDowload() {
    html2canvas(document.querySelector("#hinge-wrapped")).then((canvas) => {
      const link = document.createElement("a");
      link.download = `hinge-wrapped.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  return (
    <section>
      <div
        style={{
          width: "800px",
          height: "1400px",
          border: "3px solid #D3D3D3",
          borderRadius: "1%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        id="hinge-wrapped"
      >
        <Header
          username="Josh"
          startDate={props.dateWhenYouStartedDating}
          endDate={props.endDate}
        />
        <ContentArea title="Likes Sent">
          <h2>{props.numberOfLikes} Likes</h2>
          <h2>
            {props.ratio.comment2like}% Likes sent <br /> with Comments
          </h2>
        </ContentArea>
        <PercentageFact>
          <h2>
            {props.ratio.match2like}% of your <br /> Likes Turned <br /> Matches
          </h2>
        </PercentageFact>
        <ContentArea title="Matches Recived" isReversed={true}>
          <h2>{props.numberOfMatches} Matches</h2>
        </ContentArea>
        <PercentageFact isReversed={true}>
          <h2>
            {props.ratio.conversation2match}% of <br /> your Matches <br />{" "}
            Turned Long
            <br />
            Conversations{" "}
          </h2>
        </PercentageFact>
        <ContentArea title="Conversations Had" style={{marginBottom: '18px'}}>
          <h2>{props.chats.total} Matches</h2>
        </ContentArea>
        <Result>
          <h2>{props.metUps.actualMet} Dates</h2>
          <small>
            ( Last Date on {moment(props.metUps.lastDate).format("MMMM Do")} )
          </small>
        </Result>
        <Footer />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "18px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={onDowload} type="primary">
          Download Image
        </Button>
      </div>
    </section>
  );
}
