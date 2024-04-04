import "./css/product.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../adminMenu/AdminMenu";
import { BiPlus } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import imageicon from "../../../img/imageicon.jpg";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

const Product = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [product_id, set_product_id] = useState(null);
  const [background_image, set_background_image] = useState(null);
  const [image, set_image] = useState(null);
  const [imagePreview, set_imagePreview] = useState(null);
  const [price, set_price] = useState(null);
  const [name, set_name] = useState(null);
  const [is_popular, set_is_popular] = useState(false);
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

  // console.log(foods_new);
  // console.log(foods_popular);

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
      url: import.meta.env.VITE_API + "/store/1",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        set_background_image(response.data.background_image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [background_image]);

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
  }, [category, foods_new, foods_popular]);

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
  }, [category, foods_new, foods_popular]);

  const [selectedImages, setSelectedImages] = useState(
    Array(foods_new.length).fill(null)
  );
  const [updateProductId, setUpdateProductId] = useState(null);
  const [isConfirmationPopupOpenName, setConfirmationPopupOpenName] =
    useState(false);
  const [isConfirmationPopular, setConfirmationPopular] = useState(false);
  const [isConfirmationPopupOpenPrice, setConfirmationPopupOpenPrice] =
    useState(false);
  const [isConfirmationPopupOpenImage, setConfirmationPopupOpenImage] =
    useState(false);
  const [mainImageBanner, setMainImageBanner] = useState(null);

  const handleImage = (e, index) => {
    const selectedImage = e.target.files[0];
    const updatedImages = [...selectedImages];
    updatedImages[index] = selectedImage;
    setSelectedImages(updatedImages);
    set_image(selectedImage);
  };

  ///Choose image handleImageBanner
  const handleImageBanner = (e) => {
    const file = e.target.files[0];

    const formdata = new FormData();
    formdata.append("background_image", file);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/store/1", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  //// onClick icon edit product name
  const openConfirmationPopupName = (id) => {
    set_product_id(id);
    setConfirmationPopupOpenName(true);
    console.log(id);
    console.log(name);
  };
  const closeConfirmationPopupName = () => {
    set_product_id(null);
    set_name(null);
    setConfirmationPopupOpenName(false);
  };

  //// onClick icon camera product image
  const openConfirmationPopupImage = (id) => {
    set_product_id(id);
    setConfirmationPopupOpenImage(true);
    console.log(id);
    console.log(image);
  };
  const closeConfirmationPopupImage = () => {
    set_product_id(null);
    set_image(null);
    setConfirmationPopupOpenImage(false);
    setSelectedImages(Array(foods_new.length).fill(null));
  };

  ///// onClick icon edit product is popular
  const openConfirmationPopular = (id) => {
    set_product_id(id);
    setConfirmationPopular(true);

    console.log(id);
    console.log(is_popular);
  };
  const closeConfirmationPopular = () => {
    set_product_id(null);
    set_is_popular(false);
    setConfirmationPopular(false);
  };

  ///// onClick icon edit product price
  const openConfirmationPopupPrice = (id) => {
    set_product_id(id);
    setConfirmationPopupOpenPrice(true);

    console.log(id);
    console.log(price);
  };

  const closeConfirmationPopupPrice = () => {
    set_product_id(null);
    set_price(null);
    setConfirmationPopupOpenPrice(false);
  };

  // Handle button function
  const ChangePrice = () => {
    console.log(product_id);
    console.log(price);

    let data = JSON.stringify({
      price: price,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/goods/${product_id}/edit/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Successfull update.");
        setConfirmationPopupOpenPrice(false);
        set_product_id(null);
        set_price(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangeName = () => {
    console.log(product_id);
    console.log(name);

    let data = JSON.stringify({
      name: name,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/goods/${product_id}/edit/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Successfull update.");
        setConfirmationPopupOpenName(false);
        set_product_id(null);
        set_name(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangeIsPopular = () => {
    console.log(product_id);
    console.log(is_popular);

    let data = JSON.stringify({
      is_popular: is_popular,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/goods/${product_id}/edit/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("업데이트가 성공했습니다.");
        setConfirmationPopular(false);
        set_product_id(null);
        set_is_popular(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangeImage = () => {
    console.log(product_id);
    console.log(image);

    const formdata = new FormData();
    formdata.append("image", image);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      import.meta.env.VITE_API + `/store/goods/image/${product_id}/edit/`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert("업데이트가 성공했습니다.");
        set_product_id(null);
        set_image(null);
        setConfirmationPopupOpenImage(false);
        setSelectedImages(Array(foods_new.length).fill(null));
      })
      .catch((error) => console.error(error));
  };

  // Choose banner image

  const [isPopupimage, setPopupimage] = useState(false);

  const togglePopupimage = () => {
    setPopupimage(!isPopupimage);
  };

  /////////////////////handleDelete
  const handleDelete = (id) => {
    console.log(id);
    let data = JSON.stringify({
      goods_id: id,
    });

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/goods`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("제품이 삭제되었습니다..");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  ///////////////popup image 


  return (
    <>
      <AdminMenu />
      <section id="product_admin">
        <div className="container_body_admin_product">
          {/* <div className="search-box_product">
            <input type="text" placeholder="찾다..." />
            <button>
              <IoSearchOutline />
            </button>
          </div> */}

          <div className="productHead_content">
            <h1 className="htxthead">
              <span className="spennofStyleadmin"></span>제품
            </h1>
            <div className="categoryBoxfiler">
              <Link to="/post" className="box_add_product">
                <BiPlus id="icon_add_product" />
                <p>제품 추가</p>
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
                      // <img src={banner1} alt="Banner" />
                      <img src={background_image} alt="Banner" />
                    )}
                    

                    {/* <img src={background_image} alt="Banner" /> */}

                    {/* <input
                      type="file"
                      id="background_image"
                      onChange={handleImageBanner}
                      required
                    /> */}
                    <div className="edit_image_logo" onClick={togglePopupimage}>
                      <CiCamera id="box_icon_camera_product" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="edit_image_banner" onClick={togglePopupimage}>
                <CiCamera id="box_icon_camera" />
              </div> */}

              {isPopupimage && (
                <form className="background_addproductpopup_box">
                  <div className="hover_addproductpopup_box_image">
                    <div className="box_input_image">
                      <p>배너 이미지 수정</p>

                      <label className="popup_Border_Boximagae">
                        <img src={imageicon} alt="Banner" />
                        <input
                          type="file"
                          id="img"
                          onChange={handleImageBanner}
                          required
                        />
                        <p className="box_choose_image">이미지 선택</p>
                      </label>
                    </div>
                    <div className="btn_foasdf">
                      <button
                        className="btn_cancel btn_addproducttxt_popup"
                        onClick={togglePopupimage}
                      >
                        아니요
                      </button>
                      <button className="btn_confirm btn_addproducttxt_popup">
                        업데이트
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>인기 메뉴
              </h1>
            </div>

            <div className="contentImageProducts">
              {foods_popular.map((product, index) => (
                <div className="box-product" key={index}>
                  <div className="box_input-img">
                    <div className="img">
                      {/* {selectedImages[index] ? (
                        <img
                          src={URL.createObjectURL(selectedImages[index])}
                          alt="Product"
                        />
                      ) : (
                        <img src={product.image} alt="Product" />
                      )} */}
                      <img src={product.image} alt="Product" />
                    </div>
                    <div
                      className="Box_delete_product"
                      onClick={() => handleDelete(product.id)}
                    >
                      <AiOutlineDelete />
                    </div>

                    <div
                      className="edit_image_product"
                      // onClick={() => openConfirmationPopupImage(product.id)}
                      onClick={() => openConfirmationPopupImage(product.id)}
                    >
                      <CiCamera id="box_icon_camera_product" />
                    </div>
                  </div>

                  {isConfirmationPopupOpenImage && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box_image">
                        <div className="box_input_image">
                          <p>제품 이미지 수정</p>
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
                            <p className="box_choose_image">이미지 선택</p>
                          </label>
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={closeConfirmationPopupImage}
                          >
                            아니요
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            onClick={() => {
                              ChangeImage();
                            }}
                          >
                            업데이트
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  {isConfirmationPopupOpenName && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="box_input">
                          <p>제품 이름 수정</p>
                          <input
                            type="text"
                            placeholder="상품명..."
                            className="input_of_txtAddproduct"
                            value={name}
                            onChange={(e) => {
                              set_name(e.target.value);
                            }}
                          />
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={closeConfirmationPopupName}
                          >
                            아니요
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            onClick={() => {
                              ChangeName();
                            }}
                          >
                            업데이트
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  {isConfirmationPopupOpenPrice && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="box_input">
                          <p>제품 가격 수정</p>
                          <input
                            type="text"
                            placeholder="제품 가격..."
                            className="input_of_txtAddproduct"
                            value={price}
                            onChange={(e) => {
                              set_price(e.target.value);
                            }}
                          />
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={closeConfirmationPopupPrice}
                          >
                            아니요
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            onClick={() => {
                              ChangePrice();
                            }}
                          >
                            업데이트
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {isConfirmationPopular && (
                    <div className="background_addproductpopup_box">
                      <div className="hover_addproductpopup_box">
                        <div className="box_input">
                          <p>인기 편집</p>
                          <div className="container_popular">
                            <label htmlFor="popular">인기 있는</label>
                            <input
                              type="checkbox"
                              id="popular"
                              checked={is_popular}
                              onChange={(e) => set_is_popular(e.target.checked)}
                            />
                          </div>
                        </div>
                        <div className="btn_foasdf">
                          <button
                            className="btn_cancel btn_addproducttxt_popup"
                            onClick={closeConfirmationPopular} // No need to pass index here
                          >
                            아니요
                          </button>
                          <button
                            className="btn_confirm btn_addproducttxt_popup"
                            onClick={() => ChangeIsPopular()}
                          >
                            업데이트
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="txtOFproduct">
                    <div
                      className="box_icon_MdOutlineEdit"
                      
                    >
                      <li>음식 이름: {product.name}</li>
                      <MdOutlineEdit id="icon_edit" onClick={() => openConfirmationPopupName(product.id)}/>
                    </div>
                    <div
                      className="box_icon_MdOutlineEdit"
                      
                    >
                      <li>가격: ￦{product.price}</li>
                      <MdOutlineEdit id="icon_edit" onClick={() => openConfirmationPopupPrice(product.id)}/>
                    </div>

                    <div
                      className="box_icon_MdOutlineEdit"
                      
                    >
                      <li>인기 있는</li>
                      <MdOutlineEdit id="icon_edit" onClick={() => openConfirmationPopular(product.id)}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>모든 메뉴
              </h1>
            </div>
            <div className="contentImageProducts">
              {foods_new.map((product, index) => (
                <div className="box-product" key={index}>
                  <div className="box_input-img">
                    <div className="img">
                      {/* {selectedImages[index] ? (
                        <img
                          src={URL.createObjectURL(selectedImages[index])}
                          alt="Product"
                        />
                      ) : (
                        <img src={product.image} alt="Product" />
                      )} */}
                      <img src={product.image} alt="Product" />
                      <input
                        type="file"
                        id={`image-${index}`}
                        onChange={(e) => handleImage(e, index)}
                        required
                      />
                    </div>

                    <div
                      className="Box_delete_product"
                      onClick={() => handleDelete(product.id)}
                    >
                      <AiOutlineDelete />
                    </div>

                    <div
                      className="edit_image_product"
                      onClick={() => openConfirmationPopupImage(product.id)}
                    >
                      <CiCamera id="box_icon_camera_product" />
                    </div>
                  </div>

                  <div className="txtOFproduct">
                    <div
                      className="box_icon_MdOutlineEdit"
                      
                    >
                      <li>음식 이름: {product.name}</li>
                      <MdOutlineEdit id="icon_edit" onClick={() => openConfirmationPopupName(product.id)}/>
                    </div>
                    <div
                      className="box_icon_MdOutlineEdit"
                      
                    >
                      <li>가격: ￦{product.price}</li>
                      <MdOutlineEdit id="icon_edit" onClick={() => openConfirmationPopupPrice(product.id)}/>
                    </div>
                    <div
                      className="box_icon_MdOutlineEdit"
                      
                    >
                      {/* <li>인기 있는</li> */}
                      {product.is_popular == true ? (
                        <li>인기 있는</li>
                      ) : (
                        <li>인기가 없음</li>
                      )}
                      <MdOutlineEdit id="icon_edit" onClick={() => openConfirmationPopular(product.id)}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
