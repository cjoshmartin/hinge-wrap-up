import { useState } from "react";
import Results from "../components/results";
import styles from "../styles/Home.module.css";


import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

const __data = {
  "numberOfLikes": 320,
  "numberOfComments": 155,
  "numberOfMatches": 22,
  "ratio": {
      "comment2like": "48.44",
      "match2like": "6.88",
      "match2comment": "14.19",
      "conversation2match": "54.55"
  },
  "numberOfUnMatches": 0,
  "chats": {
      "total": 12,
      "longest": 0,
      "average": 0
  },
  "metUps": {
      "actualMet": 2,
      "HingleIsAsking": 3,
      "wasYourType": 1,
      "notYourType": 1,
      "lastDate": "2023-03-14T02:51:08.000Z"
  },
  "dateWhenYouStartedDating": "2023-01-14T00:00:00.000Z"
}

export default function Home() {
  const [file, setFile] = useState(null);
  const [matchData, setMatchData] = useState<any>(__data);

  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };
  const onSubmit = async (event) => {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    }).then((res) => res.json());
    console.log(response.data)
    setMatchData(response.data);
  };

  return (
    <div className={styles.container}>
      {!matchData && (
        <div>
          <h1>Hingle Data</h1>
          <input type="file" name="zip_file" onChange={onFileChange} />
          <input type="submit" value="Upload" onClick={onSubmit} />
        </div>
      )}
      {matchData && (
        <div>
          <div>
            <h1>file has been successful</h1>
            <button onClick={() => setMatchData(undefined)}>
              Upload another File
            </button>
          </div>

          <Results {...matchData} />
        </div>
      )}

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
