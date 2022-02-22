import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageHero } from '../components';
import { formatPrice } from '../utils/helpers';
import { clearCart } from '../redux/features/cartSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart, amount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  if (cart.length === 0) {
    return (
      <main>
        <PageHero page='checkout' />
        <Wrapper className='page'>
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero page='checkout' />
      <Wrapper className='page'>
        <div className='empty'>
          <h2>Hello {user.name}</h2>
          <p>Your total is {formatPrice(amount + 534)}</p>
          <Link to='/' className='btn' onClick={() => dispatch(clearCart())}>
            Pay
          </Link>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export default CheckoutPage;
