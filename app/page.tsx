'use client';
import { Button, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import Results from "./components/results";
import __data from "../lib/sample_data.json";
import Nav from "./components/Nav";
import styles from './page.module.css'

import JSZip from "jszip";

function UploadForm({matchData, setMatchData}: any){
  const [file, setFile] = useState(null);

  const onFileChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };
  const onSubmit = async (event: any) => {
    // more files !
    if (!file){
      return
    }
    const new_zip = new JSZip();
    const data = await new_zip.loadAsync(file)
    .then( async (zip) => {
      if (!zip){
        return {};
      }
      return {
        //@ts-ignore
        matchData: JSON.parse(await zip?.file("export/matches.json").async('string')),
        //@ts-ignore
        userData: JSON.parse(await zip?.file("export/user.json").async('string')),
        //@ts-ignore
        images: JSON.parse(await zip?.file("export/media.json").async('string'))
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
    setMatchData(response.data);
    // localStorage.setItem('matchData', JSON.stringify(response.data));
  };
   if (matchData) {
    return null;
   }

   return (
            <>
          <div 
          style={{ margin: "2rem 0" }}
          >
            <h2>A little Scared?</h2>
            <div>
              <p
              style={{paddingBottom: '1rem'}}
              >
                look at my data first and see what it is like before you upload
                yours...
              </p>
              <Button onClick={() => setMatchData(__data)}>
                Check Out Josh&#39;s Hinge Wrapped
              </Button>
            </div>
          </div>
          <div>
            <h2>Upload your Data</h2>

            <Form onFinish={onSubmit}>
              <Form.Item label="The date you started dating" name="startDate">
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Upload your hinge zip file:"
                name="zip_file"
                rules={[{ required: true }]}
              >
                <Input type="file" accept=".zip" onChange={onFileChange} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form> 
          </div>
        </>

   )
}


export default function Home() {
  const [matchData, setMatchData] = useState<any>();

  return (
    <>
      <Nav setMatchData={setMatchData} />
      <div
        className={styles.contentContainer}
      >
        <UploadForm matchData={matchData} setMatchData={setMatchData} />
        {matchData && (
          <div>
            <Button
              type="link"
              onClick={() => setMatchData(undefined)}
              style={{
                // padding: "1rem",
                margin: '1rem',
                marginLeft: '0'
              }}
            >
              {"<< Upload Other Data"}
            </Button>

            <Results {...matchData} />
          </div>
        )}

        <div style={{ maxWidth: "500px" }}>
          <h2>Privacy Policy</h2>
          <p>
            No data from the content you upload is stored or collected anywhere.
            Additionally, your data is not share with any third party.
            Everything is processed in memory and then thrown away as soon as
            you refresh the page.
          </p>
        </div>
      </div>
    </>
  );
}
