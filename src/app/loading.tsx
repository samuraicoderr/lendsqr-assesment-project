export default function Loading() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src="/media/logos/logo-animated.gif"
          alt="Loading"
          style={{
            width: "30%",
            margin: "auto",
            minWidth: "10rem",
          }}
        />
        {/* <p style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "auto"
          }}>
            Loading...
          </p> */}
      </div>
    </main>
  );
}
