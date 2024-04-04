import React from 'react'
import "./orderpage.css"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import AdminMenu from '../adminMenu/AdminMenu';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from 'react-icons/io5';

const OrderPage = () => {
    //OrderPage
    const [orders, setOrders] = useState([
        {
          orderID: 1,
          userID: 2,
          products: [
            {
              productID: 1,
              productName: "Sesame",
              amount: 2,
              price: 10,
              delivery: 2.300
            },
            {
              productID: 2,
              productName: "Seasoned",
              amount: 2,
              price: 10,
              delivery: 3.500
            },
          ],
          orderDate: "10/12/2023",
          status: "pending",
          payment: "Bcel One",
          delivery: "Houngaloun",
        },
        {
          orderID: 2,
          userID: 1,
          products: [
            {
              productID: 1,
              productName: "Nike",
              amount: 2,
              price: 10,
              delivery: 3.00
            },
            {
              productID: 2,
              productName: "Food",
              amount: 2,
              price: 10,
              delivery: 3.100
            },
    
            {
              productID: 3,
              productName: "Food2",
              amount: 2,
              price: 10,
              delivery: 1.200
            },
          ],
          orderDate: "10/12/2023",
          status: "pending",
          payment: "Bcel One",
          delivery: "Anousit",
        },
        {
          orderID: 3,
          userID: 1,
          products: [
            {
              productID: 1,
              productName: "Food3",
              amount: 2,
              price: 10,
              delivery: 2.100
            },
            {
              productID: 1,
              productName: "Food4",
              amount: 2,
              price: 10,
              delivery: 4.100
            },
          ],
          orderDate: "10/12/2023",
          status: "pending",
          payment: "Bcel One",
          delivery: "Houngaloun",
        },
        {
          orderID: 4,
          userID: 3,
          products: [
            {
              productID: 1,
              productName: "Food5",
              amount: 2,
              price: 10,
              delivery: 2.800
            },
            {
              productID: 1,
              productName: "Food6",
              amount: 2,
              price: 10,
              delivery: 2.900
            },
          ],
          orderDate: "10/12/2023",
          status: "pending",
          payment: "Bcel One",
          delivery: "Anousit",
        },
        {
          orderID: 5,
          userID: 4,
          products: [
            {
              productID: 1,
              productName: "Food7",
              amount: 2,
              price: 10,
              delivery: 3.100
            },
            {
              productID: 1,
              productName: "Food8",
              amount: 2,
              price: 10,
              delivery: 2.100
            },
          ],
          orderDate: "10/12/2023",
          status: "pending",
          payment: "Bcel One",
          delivery: "Anousit",
        },
        {
          orderID: 6,
          userID: 5,
          products: [
            {
              productID: 1,
              productName: "Food9",
              amount: 2,
              price: 10,
              delivery: 4.100
            },
            {
              productID: 1,
              productName: "Food10",
              amount: 2,
              price: 10,
              delivery: 5.100
            },
          ],
          orderDate: "10/12/2023",
          status: "pending",
          payment: "Bcel One",
          delivery: "Anousit",
        },
        
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // send order ID
    // const [id, setId] = useState();
    const navigate = useNavigate();

    const handleOrder = (sendOrderID) => {
        navigate("/orderbill/", { 
          state: { sendOrderID: sendOrderID } ,
        });
    };


    //Search orderID 
     const filteredOrder = orders.filter((order) => {
      const idMatch = searchTerm !== "" ? order.orderID == parseInt(searchTerm): true;
      return idMatch;
    });

    // prev next button user in react
    const [currentPage, setCurrentPage] = useState(1) 
    const recordsPerPage = 4
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredOrder.slice(firstIndex, lastIndex)
    const npage = Math.ceil(filteredOrder.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1) 


    return (
        <>
            <AdminMenu />
            <section id='menager'>
              <div className='container_box_orderpage'>
                <div className='box_head_search'>
                  <h2>주문하다</h2>
                  <form className="search">
                    <div className="search-box_menageruser">
                        <input 
                          type="text" 
                          placeholder="찾다 ..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        <button type="submit">
                        <IoSearchOutline />
                        </button>
                    </div>
                  </form>
                </div>
                
                {records.map((order) => (
                    <div key={order.orderID}>
                        <form className='box_users_order'>
                          <div className='box_order_text'>
                            <p>No: {order.orderID}</p>
                            <div>
                                {order.products.slice(0, 2).map((product, index) => (
                                    <span key={product.productID}>
                                        {product.productName}
                                        {index === 0 && order.products.length > 1
                                        ? ", " : " ..."}
                                    </span>
                                ))}
                            </div>
                          </div>
                          <div className='box_container_time'>
                              <p>{order.orderDate}</p>
                          </div>
                          <div className='container_order_icon'>
                              <div className='btn_pending'>
                              보류 중
                              </div>
                              <button className='btn_view' onClick={() => handleOrder(order.orderID)}>
                              보다
                              </button>
                          </div>
                        </form>
                    </div>
                ))}

                <div className='box_next_order'>
                  <button className='box_prev_next_order' onClick={prePage}>
                    <AiOutlineLeft id="box_prev_next_icon" />
                    <p>이전</p>
                  </button>
                  <div className='box_num_order'>
                    {
                      numbers.map((n, i) => (
                        <div className={`page-link ${currentPage === n? 'active' : ''}`} key={i}>
                            <div className='num_admin'>
                                <p onClick={()=> changeCPage(n)} >{n}</p>
                            </div> 
                        </div>
                      ))
                    }
                  </div>
                  
                  <button className='box_prev_nexts_order' onClick={nextPage}>
                    <p>다음</p>
                    <AiOutlineRight id="box_prev_next_icon" />
                  </button>
                </div>
              </div>
            </section>
        </>
    )
    function prePage() {
      if(currentPage !== 1) {
          setCurrentPage(currentPage - 1)
      }
    }
    function nextPage() {
      if(currentPage !== npage) {
          setCurrentPage(currentPage + 1)
      }
    }
    function changeCPage(userID) {
      setCurrentPage(userID)
    }
}

export default OrderPage