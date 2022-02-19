import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>your cart is empty</h2>
          <Link to='/products' className='btn'>
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <main>
      <PageHero page='cart' />
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
