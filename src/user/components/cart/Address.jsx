import { FaAngleLeft } from "react-icons/fa6";
import Header from "../header/Header";
import React, { useState } from "react";
import Menu from "../menu/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./address.css";

const Address = () => {
  const navigate = useNavigate();

  // state address
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [companny, setCompanny] = useState("");
  const [branch, setBranch] = useState("");

  // From detaiils products and Cart
  const location = useLocation();
  const { products = [], productsCart = [] } = location?.state || {};

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setProvince(""), setCity(""), setCompanny(""), setBranch("");

    if (products.length > 0) { // for details products
      navigate("/cart/payment", {
        state: {
          products,
          address: {
            province: province + ",",
            city: city + ",",
            companny: companny + ",",
            branch,
          },
        },
      });
    }else if(productsCart.length > 0) { // for cart
      navigate("/cart/payment", {
        state: {
          productsCart,
          address: {
            province: province + ",",
            city: city + ",",
            companny: companny + ",",
            branch,
          },
        },
      });
    }
  };

  const handleProvince = (e) => {
    const value = e.target.value;
    setProvince(value);
  };
  const handleCity = (e) => {
    const value = e.target.value;
    setCity(value);
  };
  const handleCompanny = (e) => {
    const value = e.target.value;
    setCompanny(value);
  };
  const handleBranch = (e) => {
    const value = e.target.value;
    setBranch(value);
  };

  return (
    <>
      <Header />
      <section id="address">
        <div className="gobackaddress">
          <div className="header-box">
            <Link to="/cart/payment" className="guopIconbAck">
              <FaAngleLeft className="iconnBack" />
              뒤쪽에
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="box">
            <label htmlFor="prov">주:</label>
            <input
              type="text"
              id="prov"
              value={province}
              onChange={handleProvince}
              required
            />
          </div>
          <div className="box">
            <label htmlFor="city">도시:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={handleCity}
              required
            />
          </div>
          <div className="box">
            <label htmlFor="companny">회사:</label>
            <input
              type="text"
              id="companny"
              value={companny}
              onChange={handleCompanny}
              required
            />
          </div>
          <div className="box">
            <label htmlFor="branch">나뭇가지:</label>
            <input
              type="text"
              id="branch"
              value={branch}
              onChange={handleBranch}
              required
            />
          </div>
          <div className="submit">
            <div className="save">
              <button
                type="submit"
                disabled={!province && !city && !companny && !branch}
              >
                확인하다
              </button>{" "}
              {/* The button will show when user input information */}
            </div>
          </div>
        </form>
      </section>
      <Menu />
    </>
  );
};

export default Address;
