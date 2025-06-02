import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import CategoryOverview from "./components/CategoryOverview";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { CartProvider } from "./context/CartContext";
// import CartTest from "./components/CartTest";
import Checkout from "./components/Checkout";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        {/* <CartTest /> */}
        <Routes>
          <Route path="/" element={<CategoryOverview />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
