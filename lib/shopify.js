const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query) {
  const URL = `${domain}/api/2022-04/graphql.json`;

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  };

  try {
    const response = await fetch(URL, options);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductsInCollection() {
  const query = `{
  collection(handle: "frontpage") {
    title
    products(first: 25) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
  `;

  const response = await ShopifyData(query);
  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}
