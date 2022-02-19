import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, updateSort } from '../redux/features/filterSlice';
import GridView from './GridView';
import ListView from './ListView';
import Loading from './Loading';

const ProductList = () => {
  const dispatch = useDispatch();
  const { gridView, isFilteredProductSuccess, filteredProducts } = useSelector(
    (state) => state.filter
  );
  const { products, isProductsSuccess } = useSelector(
    (state) => state.products
  );

  // set products data to filter
  useEffect(() => {
    if (isFilteredProductSuccess || !isProductsSuccess) return;
    dispatch(setProducts(products));
    // eslint-disable-next-line
  }, [products]);

  // sort the data at the begining
  useEffect(() => {
    if (!isFilteredProductSuccess) return;
    dispatch(updateSort('price-lowest'));
  }, [isFilteredProductSuccess, dispatch]);

  if (!isFilteredProductSuccess) {
    return <Loading />;
  }

  if (filteredProducts.length === 0) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (gridView) {
    return <GridView products={filteredProducts} />;
  } else {
    return <ListView products={filteredProducts} />;
  }
};

export default ProductList;
