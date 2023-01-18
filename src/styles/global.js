import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
        text-decoration: none;
        font-family: Nunito;
    }

    body{
        background-color: #2d2d2d;
        display: flex;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	width: 32rem;
	min-height: 45rem;
	background: rgba(0, 0, 0, 0.1);
	background-color: #d3d3d3;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
	border-radius: 8px;

	.title {
		color: #e74646;
		font-size: 2.5rem;
		font-weight: 600;
	}
`;

export const Flex = styled.div`
	display: flex;
	justify-content: ${(props) => props.justify || "center"};
	align-items: ${(props) => props.align || "center"};
	flex-direction: ${(props) => props.direction || "column"};
`;

export const Input = styled.input`
	width: 16rem;
	padding: 0.2rem;
	margin: 0.5rem;
	border-radius: 8px;
	border: none;
	font-size: 1rem;
`;

export const Button = styled.button`
	padding: 0.2rem 1rem;
	border-radius: 8px;
	border: none;
	font-size: 1rem;
	background-color: #e74646;

    cursor: pointer;

    &:hover{
        opacity: 0.9;
        color: "green"};
    }
`;

export const Item = styled.li`
	list-style: none;
	padding: 0.2rem 0.8rem;
	width: 20rem;
	height: 1.6rem;
	background-color: ${(props) => (props.checked ? "#ACFA9E" : "#f3f3f3")};
    margin .6rem 0;
    border-radius: 8px;
    display: flex;
    align-items:center;
    justify-content: space-between;

    p{
        text-align: justify;
        text-decoration-line: ${(props) =>
			props.checked ? "line-through" : "none"};
	    color: #2f2f2f;
    }

    i{
        font-size: 1.2rem;
        text-decoration-line: none;
    }

    button{
        background: transparent;
        border: none;
        cursor: pointer;
        margin: 0 .4rem;

        &:hover{
            opacity: 0.7;
            color: "green"};
        }
    }
`;
