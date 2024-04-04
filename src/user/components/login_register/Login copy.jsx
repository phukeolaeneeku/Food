import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
  const login_en = "Login";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorText, set_errorText] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePass = (e) => {
    const value = e.target.value;
    setPass(value);
  };

  const Login = (e) => {
    e.preventDefault(); // Prevent the default form submission behavsior
    let data = JSON.stringify({
      email: email,
      password: pass,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,

      url: import.meta.env.VITE_API + "/user/signin",

      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        const result = res.data;
        // console.log(JSON.stringify(res.data));
        const user = {
          email: result.email,
          image: result.image,
          is_staff: result.is_staff,
          user_id: result.user_id,
          user_name: result.user_name,
        };
        const token = result.token.access;
        if (token) {
          window.localStorage.setItem("token", token);
        }
        window.localStorage.setItem("user", JSON.stringify(user));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        set_errorText("The username or password do not match.");
      });
  };
  
  
  return (
    <>
      <section>
        <form className="box_container_login2">
          <div className="cover">
            <Link to="/" className="box_iconBack_login">
              <MdArrowBack id="iconBack" />
            </Link>
            <h2 className="box_container_login_text">{login_en}</h2>
            <p className="box_pleaselogin">Please Log in to use the service!</p>
            <div className="input">
              <label>Email</label>
              <input
                className="input_form"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleEmail}
                required
              />
              <label>Password</label>
              <input
                className="input_form"
                type="password"
                placeholder="Enter Your Password"
                value={pass}
                onChange={handlePass}
                required
              />
            </div>

            {errorText.length > 0 && (
              <div id="error_msg" className="error mt20">
                {errorText}
              </div>
            )}

            <div className="forgot_password">
              Forgot your password?{" "}
              <Link to={"/forgotpassword"} className="findpassword">
                Find password
              </Link>
            </div>

            <div className="loginbtn_login">
              <button type="submit" className="login_btn" onClick={Login}>
                Login
              </button>
            </div>
            <div className="googlebtn_btn">
              <p className="box_dont">
                Is this your first time?
                <Link to={"/register"} className="loginmoreLink">
                  Register
                </Link>
              </p>
              <div className="google_account">
                Sign up with your social media account
              </div>
              <Link className="google-login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </form>
      </section>
      {loginSuccess && (
        <div className="alert_success">
          Login successful!
        </div>
      )}
    </>
  );
};

export default LoginUser;