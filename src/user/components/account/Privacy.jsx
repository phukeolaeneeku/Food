import React from 'react'
import "./css/terms.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const Privacy = () => {
  return (
    <>
      <Header />
        <div className="box_terms">
            <Link to="/more" className="box_iconBack_terms">
              <MdArrowBack id='iconBack_terms'/>
            </Link>
            <h2>개인 정보 정책</h2>
            <div className="container_terms">
              <p>Ex sint legimus prodesset vis, cum cu suas persequeris. 
              Eu qui essent option temporibus, aliquip adipiscing eu
              vel. Dicunt numquam torquatos an eos, utroque 
              rationibus at cum. An constituam scriptoreEx sint
              legimus prodesset vis, cum cu suas persequeris. Eu qui 
              essent option temporibus, aliquip adipiscing eu vel. 
              Dicunt numquam torquatos an eos, utroque rationibus
              at cum. An constituam scriptorem eoEx sint legimus
              prodesset vis, cum cu suas persequeris. Eu qui essent
              option temporibus, aliquip adipiscing eu vel. Dicunt
              numquam torquatos an eos, utroque rationibus at cum. 
              An constituam scriptorem eoEx sint legimus prodesset
              vis, cum cu suas persequeris. Eu qui essent option 
              temporibus, aliquip adipiscing eu vel. Dicunt numquam
              torquatos an eos, utroque rationibus at cum.</p>
            </div>
        </div>
        <Menu />
    </>
  )
}

export default Privacy