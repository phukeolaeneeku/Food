import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { IoIosArrowBack } from "react-icons/io";

import "./text.css";
const Text = () => {
  return (
    <>
      <Header></Header>
      <section id="bill">
        <Link to="/" className="box_container_back_icons_back">
          <IoIosArrowBack id="icons_back" />
          <p>뒤쪽에</p>
        </Link>
        <div className="boxhead_container">
          <div className="box_coustomer">
            <h3>고객지원센터</h3>
            <p>전화 1688-</p>
            <p>팩스 031-:</p>
            <p>평일 오전 09:00 ~ 오후 17:30</p>
            <p>일요일 및 공휴일 휴무</p>
            <p>반품 배송지 주소</p>
            <p>경기도</p>
          </div>
          <div className="box_notice">
            <h3>공지 사항 게시판</h3>
            <p>발표</p>
            <p>이벤트</p>
            <p>제품 문의</p>
            <p>제품 리뷰</p>
            <p>실제 이야기</p>
            <p>자주 묻는 질문</p>
            <p>1:1로 문의해주세요</p>
          </div>
          <div className="box_favorite">
            <h3>즐겨찾는 메뉴</h3>
            <p>이벤트</p>
            <p>쇼핑 바구니</p>
            <p>좋아하는 제품</p>
            <p>주문문의</p>
            <p>나의 페이지</p>
          </div>
          <div className="box_contact">
            <h3>무은행계좌 안내</h3>
            <p>우리은행 1005-980-</p>
            <p>국민은행 821301-0</p>
            <p>예금주: 주스</p>
          </div>
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Text;
