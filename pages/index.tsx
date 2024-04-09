import { Button, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import Results from "../components/results";
import Layout from "../layout/layout";
import __data from "../lib/sample_data.json";

import JSZip from "jszip";
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
    // more files !
    const new_zip = new JSZip();
    const data = await new_zip.loadAsync(file)
    .then( async (zip) => {
      return {
        matchData: JSON.parse(await zip.file("export/matches.json").async('string')),
        userData: JSON.parse(await zip.file("export/user.json").async('string')),
        images: JSON.parse(await zip.file("export/media.json").async('string'))
      }
      
    })

    const body = JSON.stringify({
      startDate: event.startDate,
      ...data,
    });
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
          <div style={{ margin: "3rem 0" }}>
            <h2>A little Scared?</h2>
            <div>
              <p>
                look at my data first and see what it is like before you upload
                yours...
                <br />
              </p>
              <Button onClick={() => setMatchData(__data)}>
                Check Out Josh's Hinge Wrapped
              </Button>
            </div>
          </div>
          <div>
            <h2>Upload your Data</h2>

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

      <div style={{ maxWidth: "500px" }}>
        <h2>Privacy Policy</h2>
        <p>
          No data from the content you upload is stored or collected anywhere.
          Additionally, your data is not share with any third party. Everything
          is processed in memory and then thrown away as soon as you refresh the
          page.
        </p>
      </div>
    </Layout>
  );
}
