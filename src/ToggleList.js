// import { border } from "polished";
// import React, { useState } from "react";

// // 프로젝트와 관계없는 연습 파일입니다.

// const menus = [
//     {
//         id: 0,
//         content: "리스트 1",
//     },
//     {
//         id: 1,
//         content: "리스트 2",
//     },
//     {
//         id: 2,
//         content: "리스트 3",
//     },
// ];

// const Menu = ({ id, content }) => {
//     return (
//         <strong
//             style={{
//                 width: "80%",
//                 borderBottom: "1px solid black",
//                 padding: "10px",
//                 margin: "5px",
//             }}
//         >
//             {content}
//         </strong>
//     );
// };

// const ToggleList = () => {
//     const [isChecked, setIsChecked] = useState(false);
//     const handleClick = () => {
//         setIsChecked(!isChecked);
//     };
//     return (
//         <div
//             onClick={handleClick}
//             style={{
//                 border: "1px solid black",
//                 textAlign: "center",
//                 userSelect: "none",
//                 width: "40%",
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 background: "#5EBF9B",
//                 border: "none",
//                 borderRadius: "10px",
//             }}
//         >
//             <h1>토글 리스트</h1>

//             {isChecked
//                 ? menus.map((menu) => (
//                       <Menu key={menu.id} id={menu.id} content={menu.content} />
//                   ))
//                 : null}
//         </div>
//     );
// };

// export default ToggleList;
