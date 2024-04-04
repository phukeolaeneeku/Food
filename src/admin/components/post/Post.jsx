import React, { useState, useEffect } from "react";
import AdminMenu from "../adminMenu/AdminMenu";
import "./post.css";
import imageicon from "../../../img/imageicon.jpg";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCamera } from "react-icons/ci";
import {
  HiOutlineShoppingBag as HiMiniShoppingBag,
  HiPlus,
} from "react-icons/hi";
import axios from "axios";

const Post = () => {
  const token = localStorage.getItem("token");
  const storage = JSON.parse(window.localStorage.getItem("user"));

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

  console.log(storage.store_id);

  const [products, setProducts] = useState([
    {
      name: "",
      price: "",
      category: "Food",
      images: [],
      imagePreview: "",
      is_popular: false,
    },
  ]);

  console.log(products);

  const handleProductName = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].name = value;
    setProducts(updatedProducts);
  };

  const handleProductPrice = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].price = value;
    setProducts(updatedProducts);
  };

  const handlePopularChange = (event, index) => {
    const checked = event.target.checked;
    const updatedProducts = [...products];
    updatedProducts[index].is_popular = checked;
    setProducts(updatedProducts);
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProducts = [...products];
        updatedProducts[index].images.push(reader.result);
        updatedProducts[index].imagePreview = reader.result;
        setProducts(updatedProducts);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        name: "",
        price: "",
        category: "Food",
        images: [],
        imagePreview: "",
        is_popular: false,
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_API + `/store/${storage.store_id}`,
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            // Include any authorization token if required
          },
          body: JSON.stringify({ goods_set: products }),
        }
      );

      if (!response.ok) {
        alert("상품 등록에 실패했습니다.");
        throw new Error("상품 등록에 실패했습니다.");
      }

      const data = await response.json();
      console.log("등록된 제품:", data);
      alert("상품추가가 완료되었습니다.");
      window.location.reload(false);
    } catch (error) {
      console.error("상품 등록 오류:", error.message);
    }
  };

  return (
    <>
      <AdminMenu />
      <section id="post">
        <div className="boxcontainerSpan_Box"></div>
        <div className="box_container_product">
          <div className="box_text">
            <h2>제품 게시</h2>
          </div>

          <div className="group_container_product">
            {products.map((product, index) => (
              <div key={index}>
                <div className="addProduct_box_content_afterThat">
                  <div
                    className="deleteBox_productconotent"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete />
                  </div>

                  <div className="box_input-img">
                    {product.imagePreview ? (
                      <img src={product.imagePreview} alt="product" />
                    ) : (
                      <img src={imageicon} alt="default" />
                    )}
                    <input
                      type="file"
                      id={`img-${index}`}
                      onChange={(e) => handleImage(e, index)}
                      required
                    />
                  </div>

                  <div className="edit_images">
                    <label
                      htmlFor={`img-${index}`}
                      className="trigger_popup_fricc"
                    >
                      <CiCamera id="icon_ci_camera" />
                    </label>
                  </div>
                  <div className="box_container_image">
                    <div className="input-box">
                      <div className="box">
                        <input
                          type="text"
                          placeholder="상품명"
                          value={product.productName}
                          onChange={(e) => handleProductName(e, index)}
                          required
                        />
                      </div>
                      <div className="box">
                        <input
                          type="text"
                          placeholder="제품 가격"
                          value={product.price}
                          onChange={(e) => handleProductPrice(e, index)}
                          required
                        />
                      </div>
                    </div>
                    <div className="box_popular">
                      <label htmlFor={`popular-${index}`}>인기 있는</label>
                      <input
                        type="checkbox"
                        id={`popular-${index}`}
                        checked={product.is_popular}
                        onChange={(e) => handlePopularChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={handleAdd}>
              <div className="iconimage">
                <HiMiniShoppingBag id="icon_shoppingbag" />
                <HiPlus id="icon_goplus" />
              </div>
            </div>
          </div>
          <div className="btn_submit">
            <button type="submit" onClick={handleSubmit}>
            제품 게시
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
