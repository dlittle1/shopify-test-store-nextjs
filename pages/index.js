import Head from 'next/head';
import Image from 'next/image';
import { getProductsInCollection } from '../lib/shopify';
import ProductList from '../components/ProductList';

export default function Home(props) {
  const { products } = props;
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: {
      products,
    },
  };
}
