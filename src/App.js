import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
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
