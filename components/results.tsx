import { Button } from "antd";
import html2canvas from "html2canvas";
import moment, { MomentInput } from "moment";
import { PropsWithChildren, useMemo } from "react";
import BarChart from "./charts/BarChart";
import RadarChart from "./charts/RadarChart";

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
  style?: any;
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
        // gap: "5rem",
        margin: "18px",
        marginBottom: 0,
        alignContent: "space-between",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
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
      >
        {props.children}
      </Numbers>
    </div>
  );
}

const getHour = (i) =>
  `${(i % 12) + 1} ${i + 1 < 12 || i + 1 > 23 ? "am" : "pm"}`;

function PercentageFact(props: PropsWithChildren<any>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: props.isReversed ? "row-reverse" : "row",
        alignItems: "center",
        margin: "18px",
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
      <Numbers
        style={{
          padding: "3rem",
        }}
      >
        {props.children}
      </Numbers>
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
      <p>hinge-wrap-up.vercel.app</p>
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
          maxWidth: "800px",
          border: "3px solid #D3D3D3",
          borderRadius: "1%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        id="hinge-wrapped"
      >
        <Header
          username={props.first_name}
          startDate={props.dateWhenYouStartedDating}
          endDate={props.endDate}
        />
        <div
          style={{
            padding: "18px",
          }}
        >
          <BarChart
            labels={["Likes", "Matches", "Conversations", "Dates", "Unmatches"]}
            data={[
              props.numberOfLikes,
              props.numberOfMatches,
              props.chats.total,
              props.metUps.actualMet,
              props.numberOfUnMatches,
            ]}
          />
        </div>
        <ContentArea title="Likes Sent">
          <h2>{props.numberOfLikes} Likes</h2>
          <h2>
            {props.ratio.comment2like}% Likes sent <br /> with Comments
          </h2>
        </ContentArea>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <PercentageFact>
            <h2>
              {props.ratio.match2like}% of your <br /> Likes Turned <br />{" "}
              Matches
            </h2>
          </PercentageFact>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <RadarChart
              title="Number of Likes sent"
              labels={props.hoursOfLikesSent.map((_, i) => getHour(i))}
              data={props.hoursOfLikesSent}
            />
            <p>
              You really like to send likes at{" "}
              {getHour(
                props.hoursOfLikesSent.indexOf(
                  Math.max(...props.hoursOfLikesSent)
                )
              )}.
            </p>
          </div>
        </div>
        <ContentArea title="Matches Recived" isReversed={true}>
          <h2>{props.numberOfMatches} Matches</h2>
        </ContentArea>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginLeft: "18px",
            }}
          >
            <RadarChart
              title="Number of messages"
              labels={props.chats.freq.map((_, i) => getHour(i))}
              data={props.chats.freq}
            />
            <p>
              your matches and Your really <br /> like to talk at{" "}
              {getHour(props.chats.freq.indexOf(Math.max(...props.chats.freq)))}
              .
            </p>
          </div>
          <PercentageFact isReversed={true}>
            <h2>
              {props.ratio.conversation2match}% of <br /> your Matches <br />{" "}
              Turned Long
              <br />
              Conversations{" "}
            </h2>
          </PercentageFact>
        </div>
        <ContentArea title="Conversations Had" style={{ marginBottom: "18px" }}>
          <h2>
            {props.chats.total}, on average sending
            <br />
            {Math.round(props.chats.average)} messages <br />
            per conversation
          </h2>
        </ContentArea>
        <Result>
          <h2 style={{ margin: 0 }}>{props.metUps.actualMet} Dates</h2>
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
