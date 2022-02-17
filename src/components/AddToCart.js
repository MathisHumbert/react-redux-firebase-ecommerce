import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import AmountButtons from './AmountButtons';

const AddToCart = () => {
  const { product } = useSelector((state) => state.products);

  const [colorIndex, setColorIndex] = useState(0);
  const [total, setTotal] = useState(1);

  const incTotal = () => {
    if (product.stock === total) return;
    setTotal((prevState) => prevState + 1);
  };

  const decTotal = () => {
    if (total === 1) return;
    setTotal((prevState) => prevState - 1);
  };

  return (
    <Wrapper>
      <div className='colors'>
        <span>colors :</span>
        <div>
          {product.colors.map((color, index) => {
            return (
              <button
                key={index}
                className={
                  colorIndex === index ? 'color-btn active' : 'color-btn'
                }
                style={{ background: color }}
                onClick={() => setColorIndex(index)}
              >
                {colorIndex === index && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons incTotal={incTotal} decTotal={decTotal} total={total} />
        <Link to='/cart' className='btn'>
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
