import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { create } from "simple-drawing-board";
import base64Img from "base64-img";
import Swal from "sweetalert2";
import { Base64 } from "js-base64";

const MemoDiv = styled.div`
    background-color: #f2f2f2;
`;

const PostForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr 8fr 1fr;
    gap: 10px;
    grid-template-areas:
        ". .    .    .  "
        ". .    .    .  "
        ". name name .  "
        ". tool draw .  "
        ". .    .    .  "
        ". .    .    .  "
        ". .    .    .  "
        ". .    .    .  "
        ". text text .  "
        ". .    .    .  "
        ". give give .  "
        ". .    .    .  "
        ". .    .    .  ";

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
    font-size: 1.3rem;
    color: white;
    padding: 0.7rem;
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
        "pen   pen   "
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
}) => {
    const handleChange = ({ text }) => {
        setContent(text);
    };

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const canvas = useRef();
    const [sdb, setSdb] = useState();
    const [lineSize, setLineSize] = useState(10);
    const [lineColor, setLineColor] = useState("black");
    const [drawMode, setDrawMode] = useState(true);

    const clearCanvas = () => {
        sdb.clear();
    };
    const fillCanvas = () => {
        sdb.fill(lineColor);
    };
    const save = () => {
        const url = canvas.current.toDataURL("image/webp", 0.001);
        console.log(url);
        // setImage(url);
        // , quality: "0.1"
        setImage(url);
    };

    const changeColor = (e) => {
        setLineColor(e.target.value);
        sdb.setLineColor(lineColor);
    };
    const changeSize = (e) => {
        setLineSize(e.target.value);
        sdb.setLineSize(lineSize);
    };

    const changeMode = () => {
        sdb.toggleMode();
        setDrawMode(!drawMode);
    };

    const undo = async () => {
        await sdb.undo();
    };
    const redo = async () => {
        await sdb.redo();
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
                <h1
                    style={{
                        gridArea: "ma",
                    }}
                >
                    글
                </h1>
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
                        height: "80vh",
                        gridArea: "text",
                    }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleChange}
                />
                <h1
                    style={{
                        gridArea: "na",
                    }}
                >
                    그림
                </h1>
                <canvas
                    width={1920}
                    height={1080}
                    ref={canvas}
                    style={{
                        background: "white",
                        width: "100%",
                        gridArea: "draw",
                        borderRadius: "30px",
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
                        color="#5EBF9B"
                        onClick={(e) => {
                            changeMode(e);
                        }}
                        type="button"
                        style={{
                            gridArea: "pen",
                        }}
                    >
                        {drawMode ? "펜" : "지우개"}
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
                        max={300}
                        min={1.0}
                        step={0.1}
                        onChange={(e) => changeSize(e)}
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
        </MemoDiv>
    );
};

export default Memo;
