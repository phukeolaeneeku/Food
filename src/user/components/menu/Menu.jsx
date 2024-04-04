import "./menu.css"
import 'boxicons'
import { Link } from "react-router-dom";
import QrdownloadApp from '../../../img/QrdownloadApp.png'
import {FaCartShopping} from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { BsShop, BsClipboardCheck  } from "react-icons/bs";
const Menu = () => {
    return (
        <section>

            {/*Footer Menu For PC */}

            <footer className="footerBox">
                <div className="footer_Container">
                    <div className="footconentBox">
                        <h3 className="txt_footHead">회사 소개</h3>
                        <p><Link to="/" className="txt_pFoot">집</Link></p>
                        <p><Link to="/text" className="txt_pFoot">소개</Link></p>
                        <p><Link to="/order" className="txt_pFoot">명령</Link></p>
                    </div>

                    <div className="footconentBox">
                        <h3 className="txt_footHead">문의하기</h3>
                        <p><div className="txt_pFoot">전화 번호: 020 998878788</div></p>
                        <p><div className="txt_pFoot">이메일: humascot@gmail.com</div></p>
                        <p><div className="txt_pFoot">주소: Asean mall</div></p>
                    </div>
                    <div className="footconentBox3">
                        <h3 className="txt_footHead txh3">앱 다운로드</h3>
                        <div className="foot_contentItem">
                            <img src={QrdownloadApp} alt="QrdownloadApp" />
                            <div className="guop_btndownl">
                                <Link to="/" className="footLink">플레이 스토어</Link>
                                <Link to="/" className="footLink">앱 스토어</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="hrfoo"/>
                <p className="lastFooter">
                    저작권 &#169;
                     TACA 2023
                </p>
            </footer>

            {/* Footer Menu For Mobile */}

            <div className="menubar">
                <Link to="/" className="box-menu active">
                    <span className="iconMenuSpan"><HiOutlineHome/></span><span>집</span>
                </Link>
                <Link to="/text" className="box-menu">
                    <span className="iconMenuSpan"><BsShop /></span><span>소개</span>
                </Link>
                <Link to="/order" className="box-menu">
                    <span className="iconMenuSpan"><BsClipboardCheck/></span><span>명령</span>
                </Link>
                <Link to="/cart" className="box-menu">
                    <span className="iconMenuSpan"><FaCartShopping/></span><span>카트</span>
                </Link>
            </div>

        </section>
    )
}

export default Menu;