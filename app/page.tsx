'use client';
import { Button, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import Results from "./components/results";
import __data from "../lib/sample_data.json";
import Nav from "./components/Nav";
import styles from './page.module.css'

import JSZip from "jszip";
import Link from "next/link";

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
       <div style={{ margin: "2rem 0", maxWidth: '550px' }}>
         <h2>A little Scared?</h2>
         <p>Here is a youtube video I made about this application</p>
         <div
          style={{padding: '1rem'}}
         >
           <iframe
             width="500"
             height="315"
             src="https://www.youtube.com/embed/53LIU9X-8Z0?si=5Y6dZHpY6VZqUgXr"
             title="YouTube video player"
             //@ts-ignore
             frameborder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerpolicy="strict-origin-when-cross-origin"
             allowfullscreen
           ></iframe>
         </div>
         <div>
           <p style={{ paddingBottom: "1rem" }}>
             You can also look at my data first before uploading your own. by
             clicking the button below:
           </p>
           <Button onClick={() => setMatchData(__data)}>
             Check Out Josh&#39;s Hinge Trends
           </Button>
         </div>
       </div>
       <div style={{maxWidth: '550px'}}>
         <h2>Upload your Data</h2>
          <p style={{padding: '1rem 0'}}>Read the following guide to understand how to get your hinge data from hinge. so that you can use this application to find the trends in your data: <Link href="/how-to-download">click here</Link></p>
          <p style={{paddingBottom: '1rem'}}>Otherwise, if you already have your data you can fill out the form and see the results of your trends.</p>
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
   );
}


export default function Home() {
  const [matchData, setMatchData] = useState<any>();

  return (
    <>
        <UploadForm matchData={matchData} setMatchData={setMatchData} />
        {matchData && (
          <div
            style={{
             width: '100%' 
            }}
          >
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

        <div className={styles.policies} style={{
           maxWidth: "500px",
           height: matchData ? "300px": "inital",
           paddingTop: matchData ? "1rem" : "inital",
           }}>
          <h2>Privacy Policy</h2>
          <p>
            No data from the content you upload is stored or collected anywhere.
            Additionally, your data is not share with any third party.
            Everything is processed in memory and then thrown away as soon as
            you refresh the page.
          </p>
        </div>
    </>
  );
}
