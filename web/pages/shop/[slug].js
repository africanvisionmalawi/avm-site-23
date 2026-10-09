import { PageShop } from "components/shop/PageShop";
import {
  getAllShopProducts,
  getShopProductBySlug,
} from "lib/content";

export const Shop = ({ data, currentSlug }) => {
  return <PageShop data={data} currentSlug={currentSlug} />;
};

export async function getStaticPaths() {
  const allPages = getAllShopProducts();
  return {
    paths: allPages.map((page) => ({
      params: {
        slug: page.slug.current,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const currentSlug = params.slug;
  const page = getShopProductBySlug(currentSlug);

  if (!page || page.hide) {
    return { notFound: true };
  }

  const allProducts = getAllShopProducts().filter(
    (product) => product.slug.current !== currentSlug
  );

  return {
    props: {
      data: {
        page,
        allProducts,
      },
      currentSlug,
    },
  };
}

export default Shop;
