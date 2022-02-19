import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import {
  updateFilters,
  filterProducts,
  clearFilters,
} from '../redux/features/filterSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const { filters, allProducts } = useSelector((state) => state.filter);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'category') {
      value = e.target.textContent;
    }
    if (name === 'color') {
      value = e.target.dataset.color;
    }
    if (name === 'shipping') {
      value = e.target.checked;
    }

    dispatch(updateFilters({ name, value }));
  };

  const { category, color, company, shipping, price, search } = filters;

  const categories = getUniqueValues('category', allProducts);
  const companies = getUniqueValues('company', allProducts);
  const colors = getUniqueValues('colors', allProducts);

  useEffect(() => {
    dispatch(filterProducts());
  }, [filters]);

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={onSubmit}>
          {/* SEARCH */}
          <div className='form-control'>
            <input
              type='text'
              name='search'
              placeholder='search'
              className='search-input'
              value={search}
              onChange={handleFormChange}
            />
          </div>
          {/* CATEGORY */}
          <div className='form-control'>
            <h5>category</h5>
            {categories.map((item, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  name='category'
                  className={category === item ? 'active' : ''}
                  onClick={handleFormChange}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {/* COMPANY */}
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='company'
              className='company'
              value={company}
              onChange={handleFormChange}
            >
              {companies.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          {/* COLORS */}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((item, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    name='color'
                    data-color={item}
                    onClick={handleFormChange}
                    className={`${item === 'all' ? 'all-btn' : 'color-btn'} ${
                      color === item ? 'active' : ''
                    }`}
                    style={{ background: `${item !== 'all' && item}` }}
                  >
                    {item === 'all' && item}
                    {item === color && item !== 'all' && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              min='0'
              max='309999'
              value={price}
              onChange={handleFormChange}
            />
          </div>
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={handleFormChange}
            />
          </div>
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFilters())}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
