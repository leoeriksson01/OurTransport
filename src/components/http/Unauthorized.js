import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 500px;
	height: 1000px;
	margin: auto;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 100vw;
		padding: 15px;
		height: unset;
	}
`;

const Status = styled.h1`
	font-size: 3rem;
	@media (max-width: 768px) {
		font-size: 2.5rem;
	}
`;

const Button = styled(NavLink).attrs({ to: "/" })`
	background-color: rgb(46, 133, 110);
	border: 0;
	color: white;
	border-radius: 25px;
	padding: 10px 50px;
	width: 100%;
	text-align: center;
	font-size: 1.25rem;
	&:hover {
		text-decoration: none;
		color: white;
	}
	@media (max-width: 1200px) {
		font-size: 1.5rem;
	}
`;

const Text = styled.h4`
	margin-bottom: 50px;
	@media (max-width: 768px) {
		font-size: 1.25rem;
	}
`;

const Image = styled.img.attrs({
	loading: "lazy",
	src: "/assets/meninblackmeme.jpg",
})`
	max-width: 100%;
	margin: 35px 0;
`;

export default function Component() {
	return (
		<Container>
			<Status>401 Unauthorized</Status>
			<Image />
			<Text>I'm gonna pretend you didn't see that</Text>
			<Button>Take me home</Button>
		</Container>
	);
}
