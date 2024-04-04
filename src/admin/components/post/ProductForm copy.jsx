import React, { useState } from 'react';

const ProductForm = () => {
    const storage = JSON.parse(window.localStorage.getItem("user"));

    console.log(storage.store_id)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProductData(prevData => ({
                ...prevData,
                images: [...prevData.images, reader.result]
            }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/store/${storage.store_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any authorization token if required
                },
                body: JSON.stringify({ goods_set: [productData] })
            });

            if (!response.ok) {
                throw new Error('Failed to register product');
            }

            const data = await response.json();
            console.log('Product registered:', data);
        } catch (error) {
            console.error('Error registering product:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product Name:
                <input type="text" name="name" value={productData.name} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={productData.description} onChange={handleChange} />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={productData.price} onChange={handleChange} />
            </label>
            <label>
                Category:
                <input type="text" name="category" value={productData.category} onChange={handleChange} />
            </label>
            <label>
                Images:
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
