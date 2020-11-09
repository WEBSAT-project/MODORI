import React, { useState } from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

// 프로젝트와 관계없는 연습 파일입니다.

const StyledLogin = styled.div`
    width: 40%;
    height: 80vh;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.fontColor};
    overflow-y: auto;

    //center function
    ${({ isCenter }) => {
        const center = isCenter;
        if (center) {
            return css`
                display: flex;
                justify-content: center;
                align-items: center;
            `;
        }
    }}

    //hover event 
    ${({ backgroundColor }) => {
        console.log(backgroundColor);
        return css`
            &:hover {
                background-color: ${lighten(0.1, backgroundColor)};
            }
            &:active {
                background-color: ${darken(0.1, backgroundColor)};
            }
        `;
    }}

    //size function
    ${({ small }) => {
        console.log(small, "small");
        if (small) {
            return css`
                width: 20%;
                height: 40vh;
            `;
        }
    }}
`;

const StyledPractice = () => {
    const [state, setState] = useState({
        bc: "#000000", //background-color
        fc: "white", //font-color
        text: "안녕",
    });
    return (
        <>
            <h1 style={{}}>styled-component의 연습장입니다.</h1>
            <div
                style={{
                    display: "flex",
                }}
            >
                <StyledLogin
                    backgroundColor={state.bc}
                    fontColor={state.fc}
                    isCenter
                >
                    {state.text}
                </StyledLogin>
                <StyledLogin
                    backgroundColor={state.bc}
                    fontColor={state.fc}
                    isCenter
                    small
                >
                    {state.text}
                </StyledLogin>
                <div>
                    <div>
                        <input
                            title="색을 변경해보세요"
                            type="color"
                            value={state.bc}
                            onChange={(e) =>
                                setState({
                                    ...state,
                                    bc: e.target.value,
                                })
                            }
                        />
                        색을 바꿔보세요
                    </div>
                    <div>
                        <input
                            style={{
                                outline: "none",
                            }}
                            type="text"
                            placeholder="text값을 바꿔보세요"
                            onChange={(e) =>
                                setState({
                                    ...state,
                                    text: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StyledPractice;
