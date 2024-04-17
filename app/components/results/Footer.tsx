export function Footer(props: any) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        // margin: "0 18px",
        margin: '0.5rem',
        gap: '1rem',
      }}
    >
      <small style={
        {
          textAlign: 'start'
        }
        }>hinge-wrap-up.vercel.app</small>
      <small style={{
        textAlign: 'end'
        }}>Made by @cjoshmartin</small>
    </div>
  );
}
