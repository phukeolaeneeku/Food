import AdminMenu from "./components/adminMenu/AdminMenu";
import Board from "./components/board/Board";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/authen", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          console.log(result.decoded.urole);
          if (result.decoded.urole !== "Admin") {
            navigate("/login");
            return;
          }
        } else {
          localStorage.removeItem("userID");
          navigate("/login");
          return;
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <AdminMenu />
      <Board />
    </>
  );
};

export default Dashboard;
