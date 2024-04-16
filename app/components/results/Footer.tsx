export function Footer(props: any) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        // margin: "0 18px",
        margin: '1rem',
      }}
    >
      <p style={{textAlign: 'start'}}>hinge-wrap-up.vercel.app</p>
      <p style={{textAlign: 'end'}}>Made by @cjoshmartin</p>
    </div>
  );
}
