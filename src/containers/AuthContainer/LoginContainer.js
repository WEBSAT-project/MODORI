import React, { useState } from "react";
import Login from "../../components/Auth/Login/Login";
import Swal from "sweetalert2";
import axios from "axios";

const LoginContainer = ({ history }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const SERVER = "http://10.80.163.169:8080";
  const goHome = () => {
    history.push("/");
  };

  const onSubmit = async () => {
    try {
      const login = await axios.post(`${SERVER}/login`, {
        email: id,
        pw: password,
      });
      const token = login.data.token.token;
      localStorage.setItem("token", token);

      history.push("/");
      window.location.replace("/");

      //토큰을 로컬 스토리지에 저장
    } catch (err) {
      console.log(err);
      switch (err.response.status) {
        case 401:
          Swal.fire({
            title: "로그인 실패",
          });
          break;
        default:
          Swal.fire({
            title: "서버 오류",
            icon: "error",
          });
      }

      setId("");
      setPassword("");
      return;
    }

    // if () {
    //     history.push("/");
    // } else {
    //     Swal.fire({
    //         title: "로그인 실패",
    //         icon: "error",
    //         confirmButtonColor: "#6df2c1",
    //         confirmButtonText: "확인",
    //         animation: false,
    //     });
    // }
  };
  return (
    <Login
      onSubmit={onSubmit}
      id={id}
      setId={setId}
      password={password}
      setPassword={setPassword}
      goHome={goHome}
    />
  );
};

export default LoginContainer;
