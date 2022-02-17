import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
import { getProducts } from '../redux/features/productsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.products);

  useEffect(() => {
    if (isSuccess) return;

    dispatch(getProducts());
  }, []);

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
