import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

const CartTotals = () => {
  const { amount } = useSelector((state) => state.cart);
  const { userLoggedIn } = useSelector((state) => state.user);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal: <span>{formatPrice(amount)}</span>
          </h5>
          <p>
            shipping fee: <span>$5.34</span>
          </p>
          <hr />
          <h4>order total : {formatPrice(amount + 534)}</h4>
        </article>
        <Link to={`${userLoggedIn ? '/chekout' : '/login'}`} className='btn'>
          {userLoggedIn ? 'proceed to checkout' : 'login'}
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
