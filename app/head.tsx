// app/head.tsx
export default function Head() {
  return (
    <>
      <meta
        name="fc:frame"
        content={JSON.stringify({
          version: "1",
          imageUrl: "https://www.buttersdream.xyz/share-image.png",
          button: {
            title: "Open App",
            action: {
              type: "launch_frame",
              url: "https://www.buttersdream.xyz/",
              name: "Butter's Dream",
              splashImageUrl: "https://www.buttersdream.xyz/logo.png",
              splashBackgroundColor: "#ffdfec",
            },
          },
        })}
      />
    </>
  );
}
