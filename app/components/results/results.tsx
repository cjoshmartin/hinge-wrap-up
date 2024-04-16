import { Button } from "antd";
import html2canvas from "html2canvas";
import moment from "moment";
import BarChart from "../charts/BarChart";
import RadarChart from "../charts/RadarChart";
import  Header from "./Header";
import { ContentArea } from "./ContentArea";
import { PercentageFact } from "./PercentageFact";
import { Result } from "./Result";
import { Footer } from "./Footer";

import styles from './results.module.css'

const getHour = (i: number) =>
  `${(i % 12) + 1} ${i + 1 < 12 || i + 1 > 23 ? "am" : "pm"}`;



function Container(props: any){
  return (
      <div className={styles.container}>
        <Header
          username={props.first_name}
          startDate={props.dateWhenYouStartedDating}
          endDate={props.endDate}
          image={props.image}
          title={props.title}
        />
        {props.children}
        <Footer />
        </div>
  );
}

function LikeResults(props: any){
  return (
    <Container {...props} title={"Likes"}>
        <div className={styles.barGraphContainer}>
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
          className={styles.halfWidthFact}
        >
          <PercentageFact>
            <h2>
              {props.ratio.match2like}% of your <br /> Likes Turned <br />{" "}
              Matches
            </h2>
          </PercentageFact>
          <div className={styles.graphView} >
            <RadarChart
              title="Number of Likes sent"
              labels={props.hoursOfLikesSent.map((_:any, i:number) => getHour(i))}
              data={props.hoursOfLikesSent}
            />
            <p>
              You really like to send likes at{" "}
              <b>
                {getHour(
                  props.hoursOfLikesSent.indexOf(
                    Math.max(...props.hoursOfLikesSent)
                  )
                )}</b>.
            </p>
          </div>
        </div>
      
    </Container>
  )
}

function MatchesResults(props: any) {
  return (
    <Container {...props} title={"Matches and Conversations"}>
        <ContentArea title="Matches Received" isReversed={true}>
          <h2>{props.numberOfMatches} Matches</h2>
        </ContentArea>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className={styles.graphView} 
            style={{
              marginLeft: "1rem",
            }}
          >
            <RadarChart
              title="Number of messages"
              labels={props.chats.freq.map((_:any, i:number) => getHour(i))}
              data={props.chats.freq}
            />
            <p>
              your matches and Your really <br /> like to talk at{" "}
              <b>
                {getHour(
                  props.chats.freq.indexOf(Math.max(...props.chats.freq))
                )}
              </b>
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
        <ContentArea isPurple title="Conversations Had" style={{ marginBottom: "18px" }}>
          <h2>
            {props.chats.total}, on average sending
            <br />
            {Math.round(props.chats.average)} messages <br />
            per conversation
          </h2>
        </ContentArea> 
    </Container>
  )
}

function DateResults(props: any) {
  return (
    <Container {...props} title={"Dates"}>
        <Result>
          <h2 style={{ margin: 0 }}>{props.metUps.actualMet} Dates</h2>
          <small>
             Last date was {moment(props.metUps.lastDate).fromNow()} ({moment(props.metUps.lastDate).format("MMMM Do, YYYY")})
          </small>
        </Result>
    </Container>
  )
}

export default function Results(props: any) {
  function onDowload() {
    //@ts-ignore
    html2canvas(document.querySelector("#hinge-wrapped")).then((canvas) => {
      const link = document.createElement("a");
      link.download = `hinge-wrapped.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  return (
    <section
      style={{
        width: '100%'
      }}
    >
      {/* <div
        className={styles.container} 
        id="hinge-wrapped"
      ></div> */}
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
      }}
      >
      <LikeResults {...props}/>
      <MatchesResults {...props} />
      <DateResults {...props}/>
      </div>

      <div className={styles.downloadButtonContainer} >
        <Button onClick={onDowload} type="primary">
          Download Image
        </Button>
      </div>
    </section>
  );
}
