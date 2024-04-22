import Image from 'next/image';
import goToSettingPage from '@/public/IMG_9155.jpg'
import img2 from '@/public/IMG_9598.jpg'
import SettingsPages from '@/public/IMG_DAAD02F01D5F-1.jpeg'
import img4 from '@/public/Screenshot 2024-04-21 at 11.44.50 AM.png'
import secondImageOfDownData from '@/public/pasted image 0 (1).png'
import firstImageOfDownloadData from '@/public/pasted image 0.png'
import img7 from '@/public/submition_of_data.png'
import email from '@/public/your_data_ready_email.png'

import styles from './download.module.css'

export default function HowToDownload() {
  return (
    <>
      <br />
      <div className={styles.container}>
        <h2>How to Download Your Hinge Data</h2>
        <p>
          This is a guide on how you can get your hinge data and upload it to
          this application to find the trends in your data!
        </p>
        <h3>1. Look for this settings icon in your Hinge application</h3>
        <div>
          <Image src={goToSettingPage.src} width={400} height={120} alt="" />
        </div>
        <h3>2. In the settings menu </h3>
        <p>
          In the settings menu, look for the tab that says "Download My Data".
          Click it and it should take you to the screen you see in the next image.{" "}
        </p>
        <div>
          <Image src={SettingsPages.src} width={400} height={750} alt="" />
        </div>
        <h3>3. Submitting your request for your data </h3>
        <li>Select your country of your residence</li>
        <Image
          src={firstImageOfDownloadData.src}
          width={400}
          height={200}
          alt=""
        />
        <li>Then select your state of residence. </li>
        <li>
          Click the button saying "Download My Data". This will submit a request
          to hinge to gather your data together from their servers.
        </li>
        <Image
          src={secondImageOfDownData.src}
          width={400}
          height={300}
          alt=""
        />
        <p>
          After submitting your request to download your data. You will get the
          following email confirming that your request has been submitted:
        </p>
        <Image src={img7.src} width={400} height={350} alt="" />
        <h3>4. Retriving your data from Hinge</h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-C3E_63-7gE?si=RecQ8lS-8380aP0l"
          title="YouTube video player"
          //@ts-ignore
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <p>48 hours later, you should receive another email saying that your data is ready to be downloaded. The email should look like the following image:</p>
        <Image src={email.src} width={400} height={350} alt="" />
        <p>When you open the hinge app, you should see a new badge on the "Download my data" button in the settings app of Hinge. Click the button.</p>
        <Image src={img4.src} width={400} height={750} alt="" />
        <p>Once you click the button you should see the following screen:</p>
        <Image src={img2.src} width={400} height={300} alt="" />
        <p>Once you click "Download", it will download a zip file to your mobile device that you can upload to this website to find trends in your Hinge data.</p>
      </div>
    </>
  );
}
