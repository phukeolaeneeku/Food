import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Home from "../user/components/homepage/Home";
import More from "../user/components/account/More"
import Profile from "../user/components/account/Profile"
import Privacy from "../user/components/account/Privacy"
import Terms from "../user/components/account/Terms"
import Payment from "../user/components/cart/Payment";
import SuccessfulBuy from "../user/components/cart/SuccessfulBuy";
import Cart from "../user/components/cart/Cart";
import Address from "../user/components/cart/Address";
import Bill from "../user/components/order/Bill";
import ReviewProduct from "../user/components/order/ReviewProduct";
/* ===================================== */
import Dashboard from "../admin/Dashboard";
import Post from "../admin/components/post/Post";
import ProductForm from "../admin/components/post/ProductForm";
import Bank from "../admin/components/bank_account/Bank";
import Addaccount from "../admin/components/bank_account/Addaccount";
import Store from "../admin/components/stores/Store";

/* ============================== */
import Login from '../user/components/login_register/Login';
import Register from "../user/components/login_register/Register";
import Order from "../user/components/order/Order";
import ProductDetails from "../user/components/products/ProductDetails";
import OrderPage from "../admin/components/orderPage/OrderPage";
import OrderPending from "../admin/components/orderPage/OrderPending";
import OrderProcessing    from "../admin/components/orderPage/OrderProcessing";
import OrderShipped from "../admin/components/orderPage/OrderShipped";
import OrderDelivered from "../admin/components/orderPage/OrderDelivered";
import OrderBill from "../admin/components/orderPage/OrderBill";
import Admins from "../admin/components/menagerAdmin/Admins";
import Product from "../admin/components/products/Product";
import Text from "../user/components/order/Text";
import ForgotPassword from "../user/components/login_register/ForgotPassword";

// ===============================
import Users from "../admin/components/menagerUser/users";
import User from "../admin/components/menagerUser/User";
// import Admin from "../admin/components/menagerAdmin/admin";
import AddAdmin from "../admin/components/menagerAdmin/AddAdmin";
import Admin_acount from "../admin/components/menagerAdmin/Admin_acount";


const Links = () => {
    return(
        <Router>
            <Routes>
                {/*====================== */}
                <Route exact path="/" Component={Home}/>
                <Route exact path="/more" Component={More}/>
                <Route exact path="/profile" Component={Profile}/>
                <Route exact path="/privacy" Component={Privacy}/>
                <Route exact path="/terms" Component={Terms}/>
                <Route exact path="/payment" Component={Payment}/>
                <Route exact path="/cart/address" Component={Address}/>
                <Route exact path="/order" Component={Order}/>
                <Route exact path="/bill/:id" Component={Bill}/>
                <Route exact path="/review/:id" Component={ReviewProduct}/>
                <Route exact path="/cart/successfulBuy" Component={SuccessfulBuy}/>
                <Route exact path="/text" Component={Text}/>

                {/*====================== */}
                <Route exact path="/productdetails/:id" Component={ProductDetails}/>
                <Route exact path="/login" Component={Login}/>
                <Route exact path="/register" Component={Register}/>
                <Route exact path="/cart" Component={Cart}/>
                <Route exact path="/forgotpassword" Component={ForgotPassword}/>

                {/* Admin routes */}
                <Route exact path="/dashboard" Component={Dashboard}/>
                <Route exact path="/post" Component={Post}/>
                <Route exact path="/post2" Component={ProductForm}/>
                <Route exact path="/users" Component={Users}/>
                <Route exact path="/user" Component={User}/>
                <Route exact path="/orderpage" Component={OrderPage}/>
                <Route exact path="/order/pending" Component={OrderPending}/>
                <Route exact path="/order/processing" Component={OrderProcessing}/>
                <Route exact path="/order/shipped" Component={OrderShipped}/>
                <Route exact path="/order/delivered" Component={OrderDelivered}/>
                <Route exact path="/orderbill/:bill_id" Component={OrderBill}/>
                <Route exact path="/product" Component={Product}/>
                <Route exact path="/users/user" Component={User}/>
                <Route exact path="/admins" Component={Admins}/>
                {/* <Route exact path="/admins/admin" Component={Admin}/> */}
                <Route exact path="/addadmin" Component={AddAdmin}/>
                <Route exact path="/adminacount" Component={Admin_acount}/>
                <Route exact path="/bank" Component={Bank}/>
                <Route exact path="/addaccount" Component={Addaccount}/>
                <Route exact path="/store" Component={Store}/>
            </Routes>
        </Router>
    );
};

export default Links;