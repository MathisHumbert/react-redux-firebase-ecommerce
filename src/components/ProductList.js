import { useSelector } from 'react-redux';
import GridView from './GridView';
import ListView from './ListView';
import Loading from './Loading';

const ProductList = () => {
  const { gridView } = useSelector((state) => state.filter);
  const { products, isProductsLoading } = useSelector(
    (state) => state.products
  );

  if (isProductsLoading) {
    return <Loading />;
  }

  if (gridView) {
    return <GridView products={products} />;
  } else {
    return <ListView products={products} />;
  }
};

export default ProductList;
