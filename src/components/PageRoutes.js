import { Routes, Route } from "react-router-dom";
import Checkout from "./Chekoutform/Checkout";
import CheckOutPage from "./Pages/CheckOutPage";
import PageLink from "./PageLink";
import Products from "./Pages/Products";
import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";


const PageRoutes = () => {
  return (
    <div>
      <PageLink />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/shoppingcart" element={<CheckOutPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default PageRoutes;
