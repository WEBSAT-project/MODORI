/*eslint-disable*/
import React, { useState } from "react";
import Memo from "../components/Main/Memo";
import axios from "axios";
import Swal from "sweetalert2";
import { Base64 } from "js-base64";
import canvasToImage from "canvas-to-image";
// 제목 내용 쓴사

const MemoContainer = ({ history }) => {
    const SERVER = "http://10.80.163.169:8080";
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState();
    const [canvasState, setCanvasState] = useState();
    let fileName = "";
    const token = localStorage.getItem("token");

    {
        !token ? (
            Swal.fire(
                {
                    title: "로그인을 먼저 해주세요",
                    icon: "error",
                },
                history.replace("/login")
            )
        ) : (
            <></>
        );
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            formData.append("file", canvasState);
            console.log(formData);
            const file = await axios.post(`${SERVER}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fileName = file.data.filename;
            console.log(fileName);
        } catch (err) {
            console.log(err);
        }
        try {
            await axios.post(
                `${SERVER}/create`,
                {
                    token: token,
                    title: title,
                    post_text: content,
                    image_pass: fileName,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );

            Swal.fire({
                title: "글쓰기 완료!",
                icon: "success",
            });
            history.push("/setprofile");
        } catch (err) {
            switch (err.response.status) {
                case 403:
                    Swal.fire({
                        title: "공백이 있습니다",
                        icon: "error",
                    });
            }
        }
    };
    return (
        <Memo
            onSubmit={onSubmit}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            image={image}
            setImage={setImage}
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            // base64={base64}
            // setBase64={setBase64}
        />
    );
};

export default MemoContainer;
