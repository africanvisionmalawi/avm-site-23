import Layout from "components/layout";
// import {DefaultSeo} from 'next-seo'
import "global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <DefaultSeo /> */}
      <Component {...pageProps} />
    </Layout>
  );
}
