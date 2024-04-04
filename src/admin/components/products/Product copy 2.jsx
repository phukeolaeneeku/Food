import "./product.css";
import 깻잎 from "../../../img/깻잎.jpg";
import 더덕무침 from "../../../img/더덕무침.jpg";
import 멸치볶음 from "../../../img/멸치볶음.jpg";
import 진미채볶음 from "../../../img/진미채볶음.jpg";
import 물김치 from "../../../img/물김치.jpg";
import 참외장아찌 from "../../../img/참외장아찌.jpg";
import 파김치 from "../../../img/파김치.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../adminMenu/AdminMenu";
import { BiPlus } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import banner1 from "../../../img/banner1.png";
import imageicon from "../../../img/imageicon.jpg";
import axios from "axios";

const Product = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [ShowFilter, setShowFilter] = useState(false);
  const [foods_new, set_foods_new] = useState([]);
  const [foods_popular, set_foods_popular] = useState([]);
  const [sliceNum, set_sliceNum] = useState(8);
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [search, set_search] = useState("");
  const [category, set_category] = useState(1);
  var is_staff = false;
  if (localStorage.getItem("user")) {
    is_staff = JSON.parse(window.localStorage.getItem("user")).is_staff;
  }

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
        console.log(response.data);
        if (response.data.result != "success") {
          localStorage.clear();

          navigate("/login");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/login");
        return;
      });
  }, [token]);

  const handleMore = () => {
    set_sliceNum(sliceNum + 8);
  };

  console.log(foods_new);
  console.log(foods_popular);

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
  }, [category]);

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
  }, [category]);

  const [selectedImages, setSelectedImages] = useState(
    Array(foods_new.length).fill(null)
  );
  const [updateProductId, setUpdateProductId] = useState(null);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isConfirmationPopupOpenPrice, setConfirmationPopupOpenPrice] =
    useState(false);
  const [isConfirmationPopupOpenImage, setConfirmationPopupOpenImage] =
    useState(false);
  const [mainImageBanner, setMainImageBanner] = useState(null);

  const handleImage = (event, index) => {
    const selectedImage = event.target.files[0];
    const updatedImages = [...selectedImages];
    updatedImages[index] = selectedImage;
    setSelectedImages(updatedImages);
  };

  ///Choose image handleImageBanner
  const handleImageBanner = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageBanner([file]);
      };

      reader.readAsDataURL(file);
    }
  };

  //// onClick icon edit product name
  const openConfirmationPopup = (productID) => {
    setUpdateProductId(productID.productName);
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpen(false);
  };

  //// onClick icon camera product image
  const openConfirmationPopupImage = (productID) => {
    setUpdateProductId(productID.images);
    setConfirmationPopupOpenImage(true);
  };

  const closeConfirmationPopupImage = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpenImage(false);
  };

  //// onClick icon camera banner image
  const openConfirmationPopupBanner = (e) => {
    setUpdateProductId(e.images);
    setConfirmationPopupOpenBanner(true);
  };

  const closeConfirmationPopupBanner = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpenBanner(false);
  };

  ///// onClick icon edit product price
  const openConfirmationPopupPrice = (productID) => {
    setUpdateProductId(productID.price);
    setConfirmationPopupOpenPrice(true);
    console.log(productID);
  };

  const closeConfirmationPopupPrice = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpenPrice(false);
  };

  const UpdateImage = (id) => {
    alert(id);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const formdata = new FormData();
    formdata.append(
      "images"
      // fileInput.files[0],
      // "/C:/Users/K/Pictures/Taca product images/food.jpg"
    );

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // fetch("http://localhost:8000/api/product-image/update/"+id, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
  };

  const UpdateProductPrice = (id, price) => {
    alert(id, " : ", price);
  };

  return (
    <>
      <AdminMenu />
      <section id="product_admin">
        <div className="container_body_admin_product">
          <div className="search-box_product">
            <input type="text" placeholder="Search ..." />
            <button>
              <IoSearchOutline />
            </button>
          </div>

          <div className="productHead_content">
            <h1 className="htxthead">
              <span className="spennofStyleadmin"></span>Product
            </h1>
            <div className="categoryBoxfiler">
              <Link to="/post" className="box_add_product">
                <BiPlus id="icon_add_product" />
                <p>Add Product</p>
              </Link>
            </div>
          </div>
          <div>
            <div className="banner_no_box">
              <div className="banner_no_box_image">
                <div className="banner_no_box_image">
                  <div className="img">
                    {mainImageBanner && mainImageBanner.length > 0 ? (
                      <img
                        src={URL.createObjectURL(mainImageBanner[0])}
                        alt="Banner"
                      />
                    ) : (
                      <img src={banner1} alt="Banner" />
                    )}
                    <input
                      type="file"
                      id="img"
                      onChange={handleImageBanner}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="edit_image_banner">
                <label htmlFor="img" className="trigger_popup_fricc">
                  <CiCamera id="box_icon_camera" />
                </label>
              </div>
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>POPULAR MENU
              </h1>
            </div>

            <div className="contentImageProducts">
              {foods_popular.map((product, index) => (
                <div className="box-product" key={index}>
                  <div className="box_input-img">
                    <div className="img">
                      <img src={product.image} alt="Product" />
                    </div>

                    <div
                      className="edit_image_product"
                      onClick={() => openConfirmationPopupImage(product.id)}
                    >
                      <CiCamera id="box_icon_camera_product" />
                    </div>
                  </div>

                  {isConfirmationPopupOpenImage && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box_image">
                        <div className="box_input_image">
                          <p>Edit product image</p>
                          <label htmlFor={`image-${index}`}>
                            {selectedImages[index] ? (
                              <img
                                src={URL.createObjectURL(selectedImages[index])}
                                alt="product"
                              />
                            ) : (
                              <img src={imageicon} alt="product" />
                            )}
                            <input
                              type="file"
                              id={`image-${index}`}
                              onChange={(e) => handleImage(e, index)}
                              required
                            />
                          </label>
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={closeConfirmationPopupImage}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            // onClick={() => {
                            //   UpdateImage(product.id);
                            // }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="txtOFproduct">
                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() => openConfirmationPopup(product.id)}
                    >
                      <li>ProductName: {product.name}</li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() => openConfirmationPopupPrice(product.id)}
                    >
                      <li>
                        Price:{" "}
                        {parseFloat(product.price).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          useGrouping: true,
                        })}{" "}
                        Kip
                      </li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>ALL MENU
              </h1>
            </div>
            <div className="contentImageProducts">
              {foods_new.map((product, index) => (
                <div className="box-product" key={index}>
                  <div className="box_input-img">
                    <div className="img">
                      <img src={product.image} alt="Product" />
                      <input
                        type="file"
                        id={`image-${index}`}
                        onChange={(e) => handleImage(e, index)}
                        required
                      />
                    </div>

                    <div
                      className="edit_image_product"
                      onClick={() => openConfirmationPopupImage(product.id)}
                    >
                      {/* <label htmlFor={`image-${index}`}> */}
                      <CiCamera id="box_icon_camera_product" />
                      {/* </label> */}
                    </div>
                  </div>

                  <div className="txtOFproduct">
                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() => openConfirmationPopup(product.id)}
                    >
                      <li>ProductName: {product.name}</li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() => openConfirmationPopupPrice(product.id)}
                    >
                      <li>
                        Price:{" "}
                        {parseFloat(product.price).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          useGrouping: true,
                        })}{" "}
                        Kip
                      </li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                  </div>
                  {isConfirmationPopupOpenPrice && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="box_input">
                          <p>Edit product price</p>
                          <input
                            type="text"
                            placeholder="Product price..."
                            className="input_of_txtAddproduct"
                          />
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={closeConfirmationPopupPrice}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            onClick={() => {UpdateProductPrice(product.id)}}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isConfirmationPopupOpen && (
            <div className="background_addproductpopup_box">
              <div className="hover_addproductpopup_box">
                <div className="box_input">
                  <p>Edit product name</p>
                  <input
                    type="text"
                    placeholder="Product name..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={closeConfirmationPopup}
                  >
                    Cancel
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Product;
