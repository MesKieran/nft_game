import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomePageTitle = styled.h1`
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  position: absolute;
  text-align: center;
  width:  100%;
  height: 30%;
  font-size: 5rem;
  top: 0;
  display: flex;
  flex-direction: column;
  margin-top:300px;
  justify-content: center;
  align-items: center;
  color: #FFFFE8;
  -webkit-text-stroke: 0.2px black;
  @media (max-width: 1400px) {
    display: none;
  }

`;

export const  HomePageSub = styled(HomePageTitle)`
    font-size: 2rem;
    padding-top: 120px;
   
    
`;


