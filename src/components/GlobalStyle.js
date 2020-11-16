import { createGlobalStyle } from "styled-components";
import NotoSans from "../assets/font/NotoSansKR-Regular.otf";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "NotoSans";
        font-weight: normal;
        font-style: normal;
        src: url(${NotoSans});
    }

::-webkit-scrollbar {
  width: 7px;  /* 세로축 스크롤바 길이 */
  height: 20px;  /* 가로축 스크롤바 길이 */
}
::-webkit-scrollbar-track {
  background-color: lightblue;
  
}
::-webkit-scrollbar-track-piece {
    background-color: #5ebf9b;
    
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #2f2f2f;
}

::-webkit-scrollbar-corner {
  background-color: violet; /* 우측 하단의 코너 부분 */
}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "NotoSans" !important;
    }
`;

export default GlobalStyle;
