import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageHero } from '../components';

const CheckoutPage = () => {
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
