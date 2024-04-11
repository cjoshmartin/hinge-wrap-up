
const headerStyle: React.CSSProperties = {
  backgroundColor: "inherit",
  padding: 0,
};

export default function About() {
  return (
    <>
      <h2>About Page</h2>
      <p>
        Heavly inspired by{" "}
        <a
          href="https://receiptify.herokuapp.com/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Receiptify
        </a>{" "}
        and Tiktok dating wraps
      </p>
    </>
  );
}
