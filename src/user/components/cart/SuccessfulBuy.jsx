import React from 'react'
import './SuccessfulBuy.css'
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ImCheckmark } from 'react-icons/im';

function SuccessfulBuy() {
    return (
        <form id='menager'>
            <div className="group_lisblecackk">
                <div className="box_guopoidHead">
                    <div className="idf">
                        <p>NO: 15</p>
                        <p>ID: 4</p>
                        <p>Name: Acer</p>
                    </div>
                    <div className='box_icon_Check'>
                        <ImCheckmark id='icon_ImCheckmark' />
                    </div>
                </div>

                <div className='box_bill_productS'>
                    <hr />
                    <div className='bill_product_name'><h2>Products</h2></div>

                    <div className="order_billGopBox">
                        <div className="detial">
                            <h3>Product Name</h3>
                            <p>name...</p>
                            <p>name...</p>
                            <p>name...</p>
                        </div>
                        <div className="detial">
                            <h3>Price</h3>
                            <p>$20.00</p>
                            <p>$20.00</p>
                            <p>$20.00</p>
                        </div>
                        <div className="detial">
                            <h3>Amount</h3>
                            <p>5</p>
                            <p>5</p>
                            <p>5</p>
                        </div>
                    </div>
                    <hr />
                    <div className='box_title_product'>
                        <div className="box_titlePrice">
                            <h3>TOTAL:</h3>
                            <p>$100.00</p>
                        </div>
                        <div className="box_place-on">
                            <p>Place on: 15/09/2023</p>
                            <p>Payment method: Bcel One</p>
                            <p>Status: completed</p>
                            <p>Delivery by: Anousit</p>
                        </div>
                    </div>
                </div>
                <Link to="/product_search">
                    <button className="btnViewProduct" >Go To Shop More</button>
                </Link>
            </div>
        </form>
    )
}

export default SuccessfulBuy