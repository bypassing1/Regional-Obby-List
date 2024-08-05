import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }) {
return (
    <html lang="en">
    <body>
        <Component {...pageProps} />
        <SpeedInsights />
    </body>
    </html>
);
}

export default MyApp;
