import styled from "styled-components";
import { BackgroundProps } from "@/types/styleType";

export const Filter = styled.div`
position: absolute;
top: 45px;
left: 0;
width: 100%;
height: 95vh;

background-color: rgba(0, 0, 0, 0.5); /* 오버레이 배경색 */
z-index: -1;
`;
export const Background = styled.div<BackgroundProps>`
background: url(${props => props.$imageUrl});
background-size: cover;
background-position: center;
width: 100vw;
height: 80vh;
z-index: -1;
position: absolute; /* 배경 이미지가 페이지에 고정되도록 설정 */
top: 45px;
left: 0;
width: 100vw;
height: 80vh;
filter: blur(7px);
`;