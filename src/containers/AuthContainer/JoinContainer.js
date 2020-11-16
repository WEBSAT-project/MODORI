import Axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Join from "../../components/Auth/Join/Join";

const JoinContainer = ({ history }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [chkPassword, setChkPassword] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [isChecked, setIsChecked] = useState({
        id: false,
        nickname: false,
    });
    const SERVER = "http://10.80.163.169:8080";
    const goHome = () => {
        history.push("/");
    };
    const onSubmit = async () => {
        if (!isChecked.id) {
            Swal.fire({
                title: "이메일 중복체크를 해주세요",
            });
            return;
        }

        if (!isChecked.nickname) {
            Swal.fire({
                title: "닉네임 중복확인을 해주세요",
            });
            return;
        }

        if (password.length < 8 || password.length > 16) {
            Swal.fire({
                title: "비밀번호는 8 ~ 16자 사이입니다",
            });
            return;
        }

        if (password !== chkPassword) {
            Swal.fire({
                title: "비밀번호가 같지 않습니다",
                icon: "error",
            });
            return;
        }

        try {
            const a = await Axios.post(`${SERVER}/register`, {
                email: id,
                name: name,
                pw: password,
                nick: nickname,
            });
            Swal.fire({
                title: "회원가입 성공",
            });

            history.push("/login");
        } catch (err) {
            switch (err.response.status) {
                case 403:
                    Swal.fire({
                        title: "이메일 형식이 아닙니다",
                        icon: "error",
                    });
                    break;
                default:
                    Swal.fire({
                        title: "오류",
                        icon: "error",
                    });
            }
        }
    };
    const onChkEmail = async () => {
        try {
            const a = await Axios.post(`${SERVER}/register/email`, {
                email: id,
            });
            console.log(a.data.message);
            Swal.fire({
                title: a.data.message,
            });
            setIsChecked({
                ...isChecked,
                id: true,
            });
        } catch (err) {
            switch (err.response.status) {
                case 401:
                    Swal.fire({
                        title: "중복되는 이메일이 있습니다",
                        icon: "error",
                    });
                    break;
                case 403:
                    Swal.fire({
                        title: "형식이 잘못되었습니다",
                        icon: "error",
                    });
                    break;
                default:
                    Swal.fire({
                        title: "서버 오류입니다",
                        icon: "error",
                    });
                    break;
            }
        }
    };
    const onChkNickname = async () => {
        if (nickname.length > 8) {
            Swal.fire({
                title: "닉네임은 8자 이하입니다.",
                icon: "error",
            });
            return;
        }

        try {
            const a = await Axios.post(`${SERVER}/register/nickname`, {
                nick: nickname,
            });
            console.log(a.data.message);
            Swal.fire({
                title: a.data.message,
            });
            setIsChecked({
                ...isChecked,
                nickname: true,
            });
        } catch (err) {
            switch (err.response.status) {
                case 401:
                    Swal.fire({
                        title: "중복되는 닉네임이 있습니다",
                        icon: "error",
                    });
                    break;
                default:
                    Swal.fire({
                        title: "서버 오류",
                        icon: "error",
                    });
                    break;
            }
            console.log(err);
        }
    };
    return (
        <Join
            id={id}
            setId={setId}
            password={password}
            setPassword={setPassword}
            chkPassword={chkPassword}
            setChkPassword={setChkPassword}
            name={name}
            setName={setName}
            nickname={nickname}
            setNickname={setNickname}
            onSubmit={onSubmit}
            onChkEmail={onChkEmail}
            onChkNickname={onChkNickname}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            goHome={goHome}
        />
    );
};

export default JoinContainer;
