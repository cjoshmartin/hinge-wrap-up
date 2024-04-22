import {
  GithubOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import styles from "./about.module.css";
import Link from "next/link";


interface IconCompoentProps {
    Icon: (typeof GithubOutlined),
    link?: string,
    children?: React.ReactNode
}
function IconCompoent({Icon, link, children} :IconCompoentProps){
    return (<div className={styles.iconCommpoent}>
        <Icon  className={styles.icon}/>
        {link && <Link href={link} target="_blank">{children}</Link>}

    </div>)
}

export default function Page() {
  return (
    <div className={styles.container}>
      <h2>About Page</h2>
      <div className={styles.body}>
        <div className={styles.leftHandContainer}>
          <div 
          style={{
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <div className={styles.iconContainer}>
              <IconCompoent
                Icon={InstagramOutlined}
                link="https://www.instagram.com/cjoshmartin/"
              >
                @cjoshmartin
              </IconCompoent>
              <IconCompoent
                Icon={YoutubeOutlined}
                link="https://www.youtube.com/@cjoshmartin"
              >
                @cjoshmartin
              </IconCompoent>
            <IconCompoent
              Icon={GithubOutlined}
              link="https://github.com/cjoshmartin/hinge-wrap-up"
            >
              source code 
            </IconCompoent>
              <IconCompoent
                Icon={MailOutlined}
                link="mailto:contact@cjoshmartin.com"
              >
                contact@cjoshmartin.com
              </IconCompoent>
            </div>
          </div>
          <div>
            <p>
              Hello! Thank you for visiting one of my projects! I am Josh! I am
              a software engineer based out of{" "}
              <Link href="https://en.wikipedia.org/wiki/Chicago">
                Chicago, IL,USA
              </Link>{" "}
              and I have been working professionally since 2019!
            </p>
            <p>
              I came up with this project after boredly scrolling on hinge and
              watch a few too many{" "}
              <Link
                href="https://www.tiktok.com/@grandma_droniak/video/7317371424967068970"
                target="_blank"
              >
                tiktok dating wraps
              </Link>
            </p>
            <p>Check out my website to learn more about me and what I am currently working on: <Link href={"https://cjoshmartin.com"}>cjoshmartin.com</Link></p>
          </div>
        </div>
        <div className={styles.rightHandContainer}>
          <div className={styles.profileImageContainer}>
            <Image
              src="https://storage.googleapis.com/images-for-cms/original_images/IMG_9932_copy.jpeg"
              height={600}
              width={400}
              alt="Image of Josh"
              // className={styles.profileImg}
              style={{
                objectFit: "cover",
                top: "-120px",
                position: "absolute",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
