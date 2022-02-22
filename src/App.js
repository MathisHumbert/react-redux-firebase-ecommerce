import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase.config';
import { Navbar, Sidebar, Footer, LoginSignup } from './components';
import {
  About,
  Cart,
  Checkout,
  Error,
  Home,
  Products,
  SingleProduct,
} from './pages';
import { setUser } from './redux/features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({ name: user.displayName, id: user.uid, email: user.email })
        );
      }
      return () => unsub;
    });
  });

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <LoginSignup />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        {/* START PRIVATE */}
        <Route path='/checkout' element={<Checkout />} />
        {/* END PRIVATE */}
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
