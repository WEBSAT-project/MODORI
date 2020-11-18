import React, { useState } from "react";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const UpdatePostDiv = styled.div`
  background-color: #f2f2f2;
`;

const UpdatePost = ({ history }) => {
  return (
    <UpdatePostDiv>
      <MainHeader />
      <MainFooter />
    </UpdatePostDiv>
  );
};

export default UpdatePost;
