import { PageEvent } from "components/events/PageEvent";
import { getAllEvents, getEventBySlug } from "lib/content";

const Page = ({ data, slug }) => {
  return <PageEvent data={data} slug={slug} />;
};

export async function getStaticPaths() {
  const allPages = getAllEvents();
  return {
    paths: allPages.map((page) => ({
      params: {
        slug: [page.slug.current],
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug = [] } = params;
  const currentSlug = Array.isArray(slug) ? slug[0] : slug;
  const data = getEventBySlug(currentSlug);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      slug,
    },
  };
}

export default Page;
