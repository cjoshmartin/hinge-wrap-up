import { Button, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import Results from "../components/results";
import Layout from "../layout/layout";

const __data = {
  numberOfLikes: 320,
  numberOfComments: 155,
  numberOfMatches: 22,
  ratio: {
    comment2like: "48.44",
    match2like: "6.88",
    match2comment: "14.19",
    conversation2match: "54.55",
  },
  numberOfUnMatches: 0,
  chats: {
    total: 12,
    longest: 0,
    average: 0,
  },
  metUps: {
    actualMet: 2,
    HingleIsAsking: 3,
    wasYourType: 1,
    notYourType: 1,
    lastDate: "2023-03-14T02:51:08.000Z",
  },
  dateWhenYouStartedDating: "2023-01-14T00:00:00.000Z",
};

export default function Home() {
  const [file, setFile] = useState(null);
  const [matchData, setMatchData] = useState<any>();

  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };
  const onSubmit = async (event) => {
    const body = new FormData();
    body.append("startDate", event.startDate);
    body.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    }).then((res) => res.json());
    console.log(response.data);
    setMatchData(response.data);
  };

  return (
    <Layout>
      {!matchData && (
        <div>
          <h1>Hingle Data</h1>

          <Form
            onFinish={onSubmit}
            autoComplete="off"
            size="large"
            style={{ maxWidth: 350 }}
          >
            <Form.Item label="The Date you started dating" name="startDate">
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Hinge Zip File"
              name="zip_file"
              rules={[{ required: true }]}
            >
              <Input type="file" onChange={onFileChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {matchData && (
        <div>
          <div>
            <Button type="link" onClick={() => setMatchData(undefined)}>
              {"<< Upload Other Data"}
            </Button>
          </div>

          <Results {...matchData} />
        </div>
      )}

      <div>
        <h2>Privacy Policy</h2>
        <p>
          No data from the content you upload is stored or collected anywhere.
          Additionally, your data is not share with any third party.
        </p>
      </div>
    </Layout>
  );
}
