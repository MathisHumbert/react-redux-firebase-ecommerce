import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import { getProduct } from '../redux/features/productsSlice';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isProductLoading, isProductError, product } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  if (isProductLoading || product.length < 1) {
    return <Loading />;
  }

  if (isProductError) {
    return <Error />;
  }

  const { name, images, reviews, stars, price, description, stock, company } =
    product;

  return (
    <Wrapper>
      <PageHero history='products' page={name} />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars reviews={reviews} stars={stars} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available :</span>
              {stock > 0 ? 'in stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU :</span>
              {id}
            </p>
            <p className='info'>
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
