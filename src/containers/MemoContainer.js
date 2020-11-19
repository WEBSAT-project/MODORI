/*eslint-disable*/
import React, { useState } from "react";
import Memo from "../components/Main/Memo";
import axios from "axios";
import Swal from "sweetalert2";
import { Base64 } from "js-base64";
import canvasToImage from "canvas-to-image";
// 제목 내용 쓴사

const MemoContainer = ({ history }) => {
  const SERVER = "http://192.168.0.28:8080";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  // const [canvasState, setCanvasState] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgSaved, setImgSaved] = useState(false);
  const token = localStorage.getItem("token");

  {
    !token ? (
      Swal.fire(
        {
          title: "로그인을 먼저 해주세요",
          icon: "error",
        },
        history.push("/login"),
      )
    ) : (
      <></>
    );
  }
  const img_upload = async (dataURL) => {
    const formData = new FormData();
    try {
      formData.append("file", dataURL);
      const { data } = await axios.post(`${SERVER}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      setImgSaved(true);
      setFileName(data.filename);
    } catch (err) {
      console.log(err);
    }
  };
  const post_create = async (e) => {
    e.preventDefault();
    const request = {
      token,
      title,
      post_text: content,
      image_pass: fileName,
    };

    console.log(request);

    try {
      await axios.post(`${SERVER}/create`, request, {
        headers: {
          token: token,
        },
      });

      Swal.fire({
        title: "글쓰기 완료!",
        icon: "success",
      });
      history.push("/setprofile");
    } catch (err) {
      switch (err.response.status) {
        case 403:
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
          });
      }
    }
  };

  return (
    <Memo
      onSubmit={post_create}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      image={image}
      setImage={setImage}
      // canvasState={canvasState}
      // setCanvasState={setCanvasState}
      imgUpload={img_upload}
      imgSaved={imgSaved}
      // base64={base64}
      // setBase64={setBase64}
    />
  );
};

export default MemoContainer;
