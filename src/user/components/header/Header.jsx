import React, { useState, useEffect } from "react";
import "./header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDashboard3Fill } from "react-icons/ri";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import axios from "axios";

const Header = ({ handleSearch }) => {
  // For authenticate user
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [background_image, set_background_image] = useState(null);
  const navigate = useNavigate();
  const [search, set_search] = useState("");
  const [foods, set_foods] = useState([]);
  const [is_search, set_is_search] = useState(false);
  var is_store = false;
  if (localStorage.getItem("user")) {
    is_store = JSON.parse(window.localStorage.getItem("user")).store_id;
  }
  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }

  console.log("Admin: ", is_admin)

  const menuItems = [
    { label: "집", path: "/" },
    { label: "소개", path: "/text" },
    { label: "주문", path: "/order" },
  ];

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.result != "success") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
          return;
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(error);
      });
  }, [token]);

  const [logo1, set_logo1] = useState(null);
  const [logo2, set_logo2] = useState(null);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/store/1",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.logo1));
        set_logo1(response.data.logo1);
        set_logo2(response.data.logo2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [logo1, logo2]);

  // function OnSearch(e) {
  //   e.preventDefault();
  //   let data = JSON.stringify({
  //     search: search,
  //   });

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: import.meta.env.VITE_API + "/store/search",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       // console.log(JSON.stringify(response.data));
  //       set_foods(response.data);
  //       set_is_search(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const OnSearch = async (e) => {
    e.preventDefault();
    
    try {
      const data = JSON.stringify({
        search: search,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: import.meta.env.VITE_API + "/store/search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      
      // set_foods(response.data);
      handleSearch(response.data)
      set_is_search(true);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(foods);
  console.log(is_search);

  return (
    <>
      <section id="header">
        <div className="navbar">
          <div className="headWithBox">
            <div className="headMenu">
              <div className="storename">
                <Link to="/">
                  <img src={logo1} alt="Logo" />
                </Link>
              </div>
              <div className="logo1">
                <Link to="/">
                  <img src={logo2} alt="Logo" />
                </Link>
              </div>

              <div className="boxLiMenu">
                <div className="linkLi">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.label}
                      to={menuItem.path}
                      className={`link ${
                        location.pathname === menuItem.path ? "active" : ""
                      }`}
                    >
                      {menuItem.icon}
                      <p>{menuItem.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="ulHead_box">
              <form onSubmit={OnSearch} className="searchBarForm">
                {" "}
                {/* Here is search bar */}
                <input
                  id="search"
                  type="text"
                  value={search}
                  className="input_search_heaederr"
                  placeholder="제품 검색..."
                  onChange={(e) => {
                    set_search(e.target.value);
                  }}
                ></input>
                <button type="submit">
                  <FaMagnifyingGlass className="iconSearch" />
                </button>
              </form>

              {user && (
                <div className="icon_account_login">
                  <div className="boxsearchContainer">
                    <Link to="/cart">
                      <FaCartShopping className="head_colorr" />
                    </Link>
                  </div>
                  <div>
                    <Link to="/more">
                      <FaRegUser className="head_colorr" />
                    </Link>
                  </div>
                  {is_store !== false && (
                    <div className="userAndstore">
                      <Link to={`/dashboard`}>
                        <HiOutlineBuildingStorefront className="head_colorr" />
                      </Link>
                    </div>
                  )}
                  
                </div>
              )}

              {!user && (
                <div className="icon_account_login">
                  <div className="boxsearchContainer">
                    <Link to="/cart">
                      <FaCartShopping className="head_colorr" />
                    </Link>
                  </div>
                  
                  <div>
                    <Link to="/login" className="head_colorr">
                      <p>로그인</p>

                      <BiLogIn className="login" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
