import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// 분류방법 : CSS, JS 그리고 테스트 파일을 기능이나 라우트로 분류된 폴더에 같이 두는 방법입니다
// css : styles folder
// components : components folder
// container : container folder

// 컴포넌트와 컨테이너의 설명 (컨테이너  >  컴포넌트 )
// 기능 & 로직같은 것들을 컨테이너에서 구현하고 컴포넌트는 View관련 작업들을 하는곳
