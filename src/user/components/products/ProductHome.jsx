import "./productHome.css";
import { BiLogIn } from "react-icons/bi";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import {   } from "react-icons/hi2";
import axios from "axios";
import { FaYoutube } from "react-icons/fa6";

const ProductHome = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [ShowFilter, setShowFilter] = useState(false);
  const [foods_new, set_foods_new] = useState([]);
  const [foods_popular, set_foods_popular] = useState([]);
  const [sliceNum, set_sliceNum] = useState(8);
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [search, set_search] = useState("");
  const [is_search, set_is_search] = useState(false);
  const [category, set_category] = useState(7);
  const [logo1, set_logo1] = useState(null);
  const [logo2, set_logo2] = useState(null);
  var is_store = false;
  if (localStorage.getItem("user")) {
    is_store = JSON.parse(window.localStorage.getItem("user")).store_id;
  }
  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }

  const menuItems = [
    { label: "집", path: "/" },
    { label: "소개", path: "/text" },
    { label: "명령", path: "/order" },
  ];

  // Fore search
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  console.log(searchResults);

  const handleMore = () => {
    set_sliceNum(sliceNum + 8);
  };

  const SliceGoodsListNew = useMemo(() => {
    return foods_new.slice(0, sliceNum);
  }, [foods_new]);

  const SliceGoodsListPopular = useMemo(() => {
    return foods_popular.slice(0, sliceNum);
  }, [foods_popular]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/?category=7`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        set_foods_popular(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/?category=6`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        set_foods_new(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  function StarAVG(value) {
    let star_avg = (value / 5) * 100;
    if (star_avg === 0) {
      star_avg = 100;
    }
    return star_avg;
  }

  const productDetial = (id) => {
    navigate(`productdetails/${id}`);
  };

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
      handleSearch(response.data);
      set_is_search(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(is_search);

  return (
    <div>
      {/* <Header handleSearch={handleSearch} /> */}
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
                  <div className="boxsearchContainer">
                    <Link to="https://www.youtube.com/">
                      <FaYoutube className="head_colorr" />
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

      <section id="product1">
        {searchResults.length > 0 ? (
          <div>
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>검색 결과
              </h1>
            </div>
            <div className="contentImageProducts2">
              {/* <h2>Search Results</h2> */}

              {searchResults.map((product, index) => (
                <div key={index}>
                  <div
                    className="group_itemBox"
                    onClick={() => productDetial(product.id)}
                  >
                    <div className="img">
                      <img src={product.image} alt="img" />
                    </div>
                    <div className="box_cart_searchs">
                      <FaCartShopping className="box_icon_search" />
                    </div>
                    <div className="txtOFproduct">
                      <h4>{product.name}</h4>
                      <p>{product.format_price} Kip</p>
                      <div className="star">
                        <div
                          className="on"
                          style={{ width: `${StarAVG(product.star_avg)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>인기 있는
              </h1>
            </div>
            <div className="contentImageProducts1">
              {SliceGoodsListPopular.map((product, index) => (
                <div key={index}>
                  <div
                    className="group_itemBox"
                    onClick={() => productDetial(product.id)}
                  >
                    <div className="img">
                      <img src={product.image} alt="img" />
                    </div>
                    <div className="box_cart_searchs">
                      <FaCartShopping className="box_icon_search" />
                    </div>
                    <div className="txtOFproduct">
                      <h4>{product.name}</h4>
                      <p>￦{product.format_price}</p>
                      <div className="star">
                        <div
                          className="on"
                          style={{ width: `${StarAVG(product.star_avg)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="content_itemBox">
              <div className="container_product">
                <h3 className="htxthead">
                  <span className="spennofStyle"></span>모든 메뉴
                </h3>
              </div>
              <div className="contentImageProducts2">
                {SliceGoodsListNew.map((product, index) => (
                  <div key={index}>
                    <div
                      className="group_itemBox"
                      onClick={() => productDetial(product.id)}
                    >
                      <div className="img">
                        <img src={product.image} alt="img" />
                      </div>
                      <div className="box_cart_searchs">
                        <FaCartShopping className="box_icon_search" />
                      </div>
                      <div className="txtOFproduct">
                        <h4>{product.name}</h4>
                        <p>￦{product.format_price} </p>
                        <div className="star">
                          <div
                            className="on"
                            style={{ width: `${StarAVG(product.star_avg)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductHome;
