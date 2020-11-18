import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { create } from "simple-drawing-board";
import Swal from "sweetalert2";
import domtoimage from "dom-to-image";

const MemoDiv = styled.div`
  background-color: white;
`;

const PostForm = styled.form`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 3rem;
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 0.5rem;
  grid-template-rows: 0.5fr 1fr 90vh 0.5fr 80vh 1fr 0.5fr;
  grid-template-areas: " .    .      " //1
    " name name   " //2
    " tool draw   " //3
    " .    .      " //4
    " text text   " //5
    " give give   " //6
    " .    .      "; //7

  input {
    outline: none;
  }
  textarea {
    outline: none;
  }
`;
const StyledInput = styled.input`
  padding: 0.5rem;
  border: none;
  width: 80%;
  border-bottom: 2px solid #5ebf9b;
`;

const Button = styled.button`
  background: ${(props) => props.color};
  font-size: 1rem;
  color: white;
  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;
const Toolbox = styled.div`
  grid-area: tool;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  grid-template-areas:
    "back  front "
    "color color "
    "bar   bar   "
    "pen   eraser   "
    "fill  fill  "
    "save  save  "
    "clear clear ";
`;

const Memo = ({
  onSubmit,
  title,
  setTitle,
  content,
  setContent,
  image,
  setImage,
  canvasState,
  setCanvasState,
  imgUpload,
}) => {
  const handleChange = ({ text }) => {
    setContent(text);
  };

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const canvas = useRef();
  const [sdb, setSdb] = useState({});
  const [lineSize, setLineSize] = useState(10);
  const [lineColor, setLineColor] = useState("#000000");

  const penRef = useRef();
  const eraserRef = useRef();

  const clearCanvas = () => {
    sdb.clear();
  };
  const fillCanvas = () => {
    sdb.fill(lineColor);
  };
  const save = () => {
    domtoimage.toBlob(canvas.current).then((dataUrl) => {
      // console.log(dataUrl);
      // setImage(dataUrl);
      imgUpload(dataUrl);
      Swal.fire({
        title: "저장 완료",
        icon: "success",
      });
    });
    // const fileReader = new FileReader();
    // const dataUrl = canvas.current.toDataURL();
    // const a = fileReader.readAsDataURL(dataUrl);
    // console.log(a)

    // fileReader.readAsDataURL(canvas.current.toDataURL());
    // console.log(canvas.current.toDataURL());
    // const a = canvasToImage(canvas.current, {
    //     name: "asdfadf",
    //     type: "png",
    //     quality: 1,
    // });
    // console.log(canvasToImage);
    // console.log(sdb);
    // const image = sdb.toDataURL();
    // const link = document.createElement("a");
    // link.href = image;
    // link.download = "draw.png";
    // link.click();
  };
  const changeColor = (e) => {
    setLineColor(e.target.value);
    sdb.setLineColor(e.target.value);
  };
  const changeSize = (e) => {
    setLineSize(e.target.value);
    sdb.setLineSize(e.target.value);
  };

  const changeMode = (e) => {
    const { id } = e.target;
    console.log(e.target.style.backgroundColor);

    sdb.toggleMode();

    if (id === "1") {
      const { style } = penRef.current;
      style.backgroundColor = "#5EBF9B";
      eraserRef.current.style.backgroundColor = "";
      if (sdb.mode === "erase") {
        sdb.toggleMode();
        return;
      }
    } else {
      const { style } = eraserRef.current;
      style.backgroundColor = "#5EBF9B";
      penRef.current.style.backgroundColor = "";
      if (sdb.mode === "draw") {
        sdb.toggleMode();
      }
    }
  };

  const undo = async () => {
    // if (sdb.mode === "erase") {
    //     sdb.toggleMode();
    //     sdb.undo();
    // }
    // sdb.toggleMode();
    sdb.undo();
  };
  const redo = async () => {
    // if (sdb.mode === "erase") {
    //     sdb.toggleMode();
    //     sdb.undo();
    // }
    // sdb.toggleMode();
    sdb.redo();
  };
  useEffect(() => {
    const sdb = create(canvas.current);
    setSdb(sdb);
    sdb.setLineSize(lineSize);
    sdb.setLineColor(lineColor);
  }, []);

  return (
    <MemoDiv>
      <MainHeader />
      <PostForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            gridArea: "name",
            width: "100%",
            fontSize: "2rem",
          }}
        />
        <MdEditor
          style={{
            width: "100%",
            height: "100%",
            gridArea: "text",
          }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleChange}
        />
        <canvas
          width={1920}
          height={1080}
          ref={canvas}
          style={{
            background: "white",
            width: "100%",
            height: "100%",
            gridArea: "draw",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.44)",
          }}
        ></canvas>
        <Toolbox>
          <Button
            onClick={() => clearCanvas()}
            color="#ed4337"
            type="button"
            style={{
              gridArea: "clear",
            }}
          >
            모두 지우기
          </Button>
          <Button
            color="#5EBF9B"
            onClick={() => {
              fillCanvas();
            }}
            type="button"
            style={{
              gridArea: "fill",
            }}
          >
            채우기
          </Button>
          <Button
            id="1"
            ref={penRef}
            onClick={(e) => {
              changeMode(e);
            }}
            type="button"
            style={{
              gridArea: "pen",
              backgroundColor: "#5EBF9B",
            }}
          >
            펜
          </Button>
          <Button
            ref={eraserRef}
            id="2"
            onClick={(e) => {
              changeMode(e);
            }}
            type="button"
            style={{
              gridArea: "eraser",
              backgroundColor: "",
            }}
          >
            지우개
          </Button>
          <input
            type="color"
            onChange={(e) => changeColor(e)}
            value={lineColor}
            style={{
              gridArea: "color",
              width: "100%",
              height: "100%",
              outline: "none",
              border: "none",
            }}
          />
          <input
            type="range"
            value={lineSize}
            max={150}
            min={1.0}
            step={0.1}
            onChange={(e) => {
              changeSize(e);
            }}
            style={{
              gridArea: "bar",
            }}
          />
          <Button
            onClick={() => undo()}
            type="button"
            color="#5EBF9B"
            style={{
              gridArea: "back",
              fontSize: "2rem",
            }}
          >
            ↩
          </Button>
          <Button
            onClick={() => redo()}
            type="button"
            color="#5EBF9B"
            style={{
              gridArea: "front",
              fontSize: "2rem",
            }}
          >
            ↪
          </Button>
          <Button
            color="#5EBF9B"
            onClick={() => {
              save();
            }}
            type="button"
            style={{
              gridArea: "save",
            }}
          >
            저장
          </Button>
        </Toolbox>
        <Button
          onClick={onSubmit}
          color="#38A67E"
          style={{
            gridArea: "give",
          }}
        >
          제출
        </Button>
      </PostForm>
      <MainFooter />
    </MemoDiv>
  );
};

export default Memo;
