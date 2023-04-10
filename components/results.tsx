import { useEffect } from "react";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";

export default function Results(props: any) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <h1>Results</h1>
      <section>
        <div>
          <h2>Likes</h2>
          <div>
            <p>
              you have sent a total <b>{props.numberOfLikes} likes</b>
            </p>
          </div>
          <BarChart
            title="Type of Likes Sent"
            labels={["Likes without Comments", "Likes with Comments"]}
            data={[
              props.numberOfLikes - props.numberOfComments,
              props.numberOfComments,
            ]}
            colors={["rgb(255, 99, 132)", "rgb(255, 205, 86)"]}
          />

          <PieChart
            title="Your Comment to Like Ratio"
            labels={["Percentage with Comments", "Perentage WITHOUT Comments"]}
            data={[props.ratio.comment2like, 100 - props.ratio.comment2like]}
            colors={["rgb(255, 99, 132)", "rgb(255, 205, 86)"]}
          />
        </div>

        <div>
          <h2>Matches</h2>
          <p>you have received: {props.numberOfMatches} matches</p>
          <p>Your Match to Like ratio is: {props.ratio.match2like}%</p>
          {/* <p>Your Match to Comment ratio is: {props.ratio.match2comment}%</p> */}
          {props.numberOfUnMatches > 0 && (
            <p>
              Additionally, {props.numberOfUnMatches} of the people you matched
              with unmatch you or you removed them! WOW!
            </p>
          )}
        </div>
        <div>
          <h2>Conversations</h2>
          <p>You held a conversation with {props.chats.total} people</p>
          <p>
            Your Conversation to Match ratio is:{" "}
            {props.ratio.conversation2match}%
          </p>
          {/* <p>
            Out of those conversations, you talked long enough in{" "}
            {props.metUps.HingleIsAsking} of them. That Hinge thinks you should
            meet those {props.metUps.HingleIsAsking} people.
          </p> */}
          <p>
            You actually meet up with {props.metUps.actualMet} of the people you
            talked to (but this is also self reported){" "}
          </p>
        </div>
        <div>
          <h2>Your Type</h2>
          <PieChart
            labels={["Your Type", "Not Your Type"]}
            data={[props.metUps.wasYourType, props.metUps.notYourType]}
            colors={["rgb(255, 99, 132)", "rgb(255, 205, 86)"]}
          />
        </div>
      </section>
    </>
  );
}
