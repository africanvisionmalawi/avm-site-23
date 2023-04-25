import Layout from "components/layout";
// import {DefaultSeo} from 'next-seo'
import "global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <DefaultSeo /> */}
      <Component {...pageProps} />
      <script
        type="text/javascript"
        src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
      ></script>
    </Layout>
  );
}
