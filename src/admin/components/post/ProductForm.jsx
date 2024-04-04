import React, { useState } from "react";
import "./ProductForm.css"; // Import CSS for styling

const ProductForm = () => {
  const storage = JSON.parse(window.localStorage.getItem("user"));

  console.log(storage.store_id);
  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      price: "",
      category: "",
      images: [],
      imagePreview: "",
    },
  ]);

  console.log(products);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedProducts = [...products];
      updatedProducts[index].images.push(reader.result);
      updatedProducts[index].imagePreview = reader.result;
      setProducts(updatedProducts);
    };
  };

  const handleImageChange2 = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedProducts = [...products];
      updatedProducts[index].images.push(file);
      updatedProducts[index].imagePreview = reader.result;
      setProducts(updatedProducts);
    };
  };

  const addProductCard = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
        imagePreview: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_API + `/store/${storage.store_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include any authorization token if required
          },
          body: JSON.stringify({ goods_set: products }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register products");
      }

      const data = await response.json();
      console.log("Products registered:", data);
    } catch (error) {
      console.error("Error registering products:", error.message);
    }
  };

  return (
    <div className="product-form-container">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Product Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={product.name}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`description-${index}`}>Description:</label>
              <textarea
                id={`description-${index}`}
                name="description"
                value={product.description}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`price-${index}`}>Price:</label>
              <input
                type="text"
                id={`price-${index}`}
                name="price"
                value={product.price}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`category-${index}`}>Category:</label>
              <input
                type="text"
                id={`category-${index}`}
                name="category"
                value={product.category}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            {/* <div className="form-group">
                            <label htmlFor={`images-${index}`}>Images:</label>
                            <input type="file" id={`images-${index}`} accept="image/*" onChange={(e) => handleImageChange(e, index)} />
                        </div> */}
            <div className="form-group">
              <label htmlFor={`images-${index}`}>Images:</label>
              <input
                type="file"
                id={`images-${index}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
              {product.imagePreview && (
                <img
                  src={product.imagePreview}
                  alt="Product Preview"
                  className="image-preview"
                />
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
      <button className="add-product-btn" onClick={addProductCard}>
        Add Product
      </button>
    </div>
  );
};

export default ProductForm;
