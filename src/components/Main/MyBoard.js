/*eslint-disable*/
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const ShareBoardDiv = styled.div`
    width: 100%;
    background-color: #f2f2f2;
`;

const MyBoard = ({ history }) => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        {
            !token ? (
                Swal.fire(
                    {
                        title: "로그인을 먼저 해주세요!",
                        icon: "error",
                    },
                    history.replace("/login")
                )
            ) : (
                <></>
            );
        }
    }, []);
    return (
        <ShareBoardDiv>
            <MainHeader />
            <MainFooter />
        </ShareBoardDiv>
    );
};
export default MyBoard;
// import React, { useState } from "react";
// import { FcSearch } from "react-icons/fc";
// import styled from "styled-components";
// import MainFooter from "./MainFooter";
// import MainHeader from "./MainHeader";
// import MainBodyContainer from "../../containers/MainBodyContainer";
// const MainDiv = styled.div`
//     width: 100%;

//     background-color: ${(props) => props.color};
// `;

// // const Logo2 = styled.img.attrs({
// //     src: LogoTitle,
// // })`
// //     width: 10%;
// // `;

// // const MainFooter = styled.div`
// //     background-color: #38a67e;
// //     width: 100%;
// //     height: 20vh;
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //     color: #f2f2f2;
// //     flex-direction: column;
// //     font-weight: bold;
// // `;

// const SearchInput = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: fixed;
//     bottom: 0;
//     right: 0;
//     margin: 1rem;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.44);
//     background: white;
//     input {
//         padding: 0.5rem;
//         border: none;
//         outline: none;
//     }
//     svg {
//         cursor: pointer;
//         margin: 0.3rem;
//     }
// `;

// const MainDivColor = "#f2f2f2";

// const Main = ({ isLoggedin }) => {
//     return (
//         <MainDiv color={MainDivColor}>
//             <MainHeader />
//             <MainBodyContainer />
//             <SearchInput>
//                 <input placeholder="검색을 해보세요" />
//                 <FcSearch
//                     onClick={() => {
//                         alert("응 없어");
//                     }}
//                 />
//             </SearchInput>
//             <MainFooter />
//         </MainDiv>
//     );
// };

// export default Main;
