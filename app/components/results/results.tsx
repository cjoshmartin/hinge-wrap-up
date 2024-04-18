'use client'
import React from "react";
import { Spin, FloatButton } from "antd";
import html2canvas from "html2canvas";
import moment from "moment";
import BarChart from "../charts/BarChart";
import RadarChart from "../charts/RadarChart";
import  Header from "./Header";
import  ContentArea from "./ContentArea";
import { PercentageFact } from "./PercentageFact";
import { Result } from "./Result";
import { Footer } from "./Footer";

import styles from './results.module.css'
import JSZip from "jszip";

const getHour = (i: number) =>
  `${(i % 12) + 1} ${i + 1 < 12 || i + 1 > 23 ? "am" : "pm"}`;



function Container(props: any){
  return (
      <div className={styles.container} id={props.id}>
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

function GeneralResults(props: any) {

  return (
    <Container {...props} title="General">
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
      <ContentArea title="Statistics" isPurple={true}>
        <h4>{props.numberOfLikes} Likes</h4>
        <h5>
          {props.chats.total} Conversations
          </h5>
        <h5>
          {props.numberOfMatches} Matches
          </h5>
        <h5>
          {props.numberOfMatches} Unmatches
          </h5>
        <h5>
          {props.metUps.actualMet} Dates
          </h5>
      </ContentArea>
    </Container>
  )
}

function LikeResults(props: any){
  return (
    <Container {...props} title={"Likes"}>
      <ContentArea title="Likes Sent">
        <h3>{props.numberOfLikes} Likes</h3>
        <h4>
          {props.ratio.comment2like}% <br /> Likes sent <br /> with Comments
        </h4>
      </ContentArea>
      <div className={styles.graphView}>
        <RadarChart
          title="Number of Likes sent"
          labels={props.hoursOfLikesSent.map((_: any, i: number) => getHour(i))}
          data={props.hoursOfLikesSent}
        />
        <p>
          You really like to send likes at{" "}
          <b>
            {getHour(
              props.hoursOfLikesSent.indexOf(
                Math.max(...props.hoursOfLikesSent)
              )
            )}
          </b>
          .
        </p>
      </div>
      <PercentageFact>
            <h3>
              {props.ratio.match2like}% of your Likes Turned {" "}
              Matches
            </h3>
          </PercentageFact>
    </Container>
  );
}

function MatchResults(props: any) {
  return (
    <Container {...props} title={"Matches"}>
        <Result isPurple>
          <h3 style={{ margin: 0 }}>Congrats on your {props.numberOfMatches} matches</h3>
        </Result>
    </Container>
  )
}

function ConversationsResults(props: any) {
  return (
    <Container {...props} title={"Conversations"}>
        <ContentArea title="Conversations">
          <h4>{props.chats.total} Conversations</h4>
          <h4>Average {Math.round(props.chats.average)} messages</h4>
          <h4>{props.ratio.conversation2match}% Turned Long</h4>
        </ContentArea>
          <div className={styles.graphView} >
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
            </p>
          </div>
    </Container>
  )
}

function DateResults(props: any) {
  return (
    <Container {...props} title={"Dates"}>
        <Result>
          <h3 style={{ margin: 0 }}>{props.metUps.actualMet} Dates</h3>
          <small>
             Last date was {moment(props.metUps.lastDate).fromNow()} ({moment(props.metUps.lastDate).format("MMMM Do, YYYY")})
          </small>
        </Result>
    </Container>
  )
}

function getBlob(selector: string) {
    //@ts-ignore
  return html2canvas(document.querySelector(selector),
    {
      useCORS: true
    }
  
  ).then((canvas) => {
       return canvas.toDataURL()
    })
}

const files = {
  'hingle-data-general.png': '#hinge-general' ,
  'hingle-data-likes.png': '#hinge-likes' ,
  'hingle-data-matches.png': '#hinge-matches' ,
  'hingle-data-conversations.png': '#hinge-conversations' ,
  'hingle-data-dates.png': '#hinge-dates' ,
}

     async function onDownload(firstName: string, setLoading : Function) {
      console.log("Downloaded started")
      setLoading(true);
      const ids = Object.values(files);

      const fileBlobs = await Promise.allSettled(
        ids.map((fileName) => getBlob(fileName))
      ).then((results) =>
        results
          // .filter(({ status }) => status === "fulfilled")
          //@ts-ignore
          .map(({ value }) => value)
      );
      const zip = new JSZip();

      const fileNames = Object.keys(files);
      for (let i = 0; i < fileBlobs.length; i++) {
        // Base64 string to blob
        const file = await fetch(fileBlobs[i]).then(r => r.blob());
        // save blobs to zip file
        zip.file(`0${i}-${fileNames[i]}`, file);
      }

      const zipData =  await zip.generateAsync({
        type: "blob",
        streamFiles: true
      })

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(zipData);
      link.download = `${firstName}'s-hinge-data.zip`
      link.click();
      console.log("Download done")
      setLoading(false);
    };

export default function Results(props: any) {
  //@ts-ignore
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <section
      style={{
        width: "100%",
      }}
    >
      <Spin spinning={isLoading} size="large" fullscreen />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <GeneralResults {...props} id={"hinge-general"} />
        <LikeResults {...props} id={"hinge-likes"} />
        <MatchResults {...props} id={"hinge-matches"} />
        <ConversationsResults {...props} id={"hinge-conversations"} />
        <DateResults {...props} id={"hinge-dates"} />
      </div>

      <div className={styles.downloadButtonContainer}>
        <FloatButton
          onClick={() => onDownload(props.first_name, setIsLoading)}
          type="primary"
          shape="square"
          description="Download Results"
          style={{
            width: '100%',
            height: '80px',
            fontWeight: 'bolder',
            bottom: 0,
            right: 0,
            borderRadius: 0
          }}
          />
      </div>
    </section>
  );
}
