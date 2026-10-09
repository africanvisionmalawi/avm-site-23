import { PageIndex } from "components/homepage/PageIndex";
import { getAllEvents, getHomePage, getOurWork } from "lib/content";

const HomePage = ({ data }) => {
  return <PageIndex data={data} />;
};

export async function getStaticProps() {
  const homePage = getHomePage();
  const events = getAllEvents();
  const ourWork = getOurWork();

  return {
    props: {
      data: {
        homePage,
        events,
        ourWork,
      },
    },
  };
}

export default HomePage;
