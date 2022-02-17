import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getProducts } from '../redux/features/productsSlice';
import { Filters, ProductList, Sort, PageHero } from '../components';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { isProductsSuccess } = useSelector((state) => state.products);

  useEffect(() => {
    if (isProductsSuccess) return;

    dispatch(getProducts());
  }, []);

  return (
    <main>
      <PageHero page='products' />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
