import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CarContext } from "../components/contexts/CarContext";
import {
	mdiMapMarker,
	mdiChevronDown,
	mdiCar,
	mdiCalendarBlank,
	mdiGauge,
} from "@mdi/js";
import Icon from "@mdi/react";
import { ShopCartContext } from "../components/contexts/ShopCartContext";

export default function Car() {
	const { findOne } = useContext(CarContext);
	const { itemExists, addToCart } = useContext(ShopCartContext);
	const { vin } = useParams(); // The :vin query parameter from the route
	const car = findOne("vin", vin);

	if (!car) {
		return null;
	}

	return (
		<Wrapper>
			<Container as={Col}>
				<Head>
					<Header>
						{car.make} {car.model} {car.year}
					</Header>
				</Head>
				<Main>
					<PreviewContainer>
						<Preview
							src={`/assets/car-pictures/${car.make}-${car.model}-${car.year}.jpg`}
							loading="lazy"
						/>
					</PreviewContainer>
					<Sidebar>
						<Description>{car.descLong}</Description>
						<Price>
							<span>Price: </span>
							<PriceNumber>${Number(car.price).toLocaleString()}</PriceNumber>
						</Price>
						<Buy onClick={() => addToCart(car)} disabled={itemExists(car)}>
							{itemExists(car) ? "Already in cart" : "Add to cart"}
						</Buy>
					</Sidebar>
				</Main>
				<Details>
					<Detail>
						<DetailMeta>
							<DetailIcon path={mdiCar} />
							<DetailHeader>Make</DetailHeader>
						</DetailMeta>
						<DetailText>{car.make}</DetailText>
					</Detail>
					<Detail>
						<DetailMeta>
							<DetailIcon path={mdiCar} />
							<DetailHeader>Model</DetailHeader>
						</DetailMeta>
						<DetailText>{car.model}</DetailText>
					</Detail>
					<Detail>
						<DetailMeta>
							<DetailIcon path={mdiCalendarBlank} />
							<DetailHeader>Year</DetailHeader>
						</DetailMeta>
						<DetailText>{car.year}</DetailText>
					</Detail>
					<Detail>
						<DetailMeta>
							<DetailIcon path={mdiGauge} />
							<DetailHeader>Mileage</DetailHeader>
						</DetailMeta>
						<DetailText>{car.miles}</DetailText>
					</Detail>
					<Detail>
						<DetailMeta>
							<DetailIcon path={mdiMapMarker} />
							<DetailHeader>City</DetailHeader>
						</DetailMeta>
						<DetailText>{car.city}</DetailText>
					</Detail>
				</Details>
			</Container>
		</Wrapper>
	);
}

const Row = styled.div`
	display: flex;
	flex-direction: row;
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
`;

const Wrapper = styled(Row)`
	padding: 100px 0;
	@media (max-width: 1200px) {
		padding: 25px;
	}
`;

const Container = styled.article`
	max-width: 1400px;
	margin: auto;
	color: rgb(50, 50, 50);
	@media (max-width: 1600px) {
		max-width: 1000px;
	}
	@media (max-width: 992px) {
		flex-direction: column;
		max-width: unset;
		padding: 15px;
	}
`;

const PreviewContainer = styled.div`
	width: 60%;
	@media (max-width: 1200px) {
		width: 100%;
	}
`;

const Preview = styled.img`
	object-fit: cover;
	height: auto;
	width: 100%;
`;

const Main = styled(Row)`
	@media (max-width: 1200px) {
		flex-direction: column;
	}
`;

const Sidebar = styled(Col)`
	overflow-y: auto;
	overflow-x: hidden;
	margin-left: 25px;
	width: 40%;
	flex-grow: 1;
	@media (max-width: 1200px) {
		width: 100%;
		margin: 0;
		margin-top: 15px;
	}
`;

const Head = styled.div``;

const Header = styled.h2`
	font-weight: bold;
	color: rgb(25, 25, 25);
	border-bottom: 1px solid rgb(225, 225, 225);
	padding-bottom: 10px;
	margin-bottom: 15px;
`;

const Description = styled.p`
	margin: 0;
	color: black;
`;

const Price = styled.h4`
	font-weight: bold;
	color: rgb(25, 25, 25);
	margin-top: 20px;
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid rgb(225, 225, 225);
	@media (max-width: 1200px) {
		font-size: 1rem;
		display: flex;
		flex-direction: column;
	}
`;

const PriceNumber = styled.span`
	@media (max-width: 1200px) {
		font-size: 1.5rem;
		margin-top: 5px;
	}
`;

const Buy = styled.button`
	background-color: #2e856e;
	border-style: none;
	border-radius: 5px;
	color: white;
	cursor: pointer;
	padding: 6px 12px;
	margin-top: 0.5rem;
	margin-bottom: 1.9rem;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	&[disabled] {
		opacity: 0.5;
	}
	@media (min-width: 768px) {
		width: 55%;
		margin: 0 auto;
		margin-bottom: 1.5rem;
	}
	@media (min-width: 1200px) {
		width: 100%;
	}
	@media (max-width: 1200px) {
		font-size: 1.5rem;
	}
`;

const Details = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	margin-top: 15px;
	grid-gap: 15px;
	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const Detail = styled(Col)`
	font-weight: bold;
	justify-content: space-between;
	border: 2px solid rgb(225, 225, 225);
	background-color: white;
	padding: 15px;
	height: 125px;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

const DetailMeta = styled(Col)`
	font-weight: bold;
	justify-content: center;
	align-items: center;
`;

const DetailHeader = styled.h5`
	font-size: 1.25rem;
`;

const DetailIcon = styled(Icon)`
	width: 1.5rem;
	height: 1.5rem;
	margin-bottom: 2px;
`;

const DetailText = styled.p`
	font-size: 1rem;
	font-weight: normal;
	margin: 0;
`;

const AccordionLabel = styled(Row)`
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgb(50, 50, 50);
	padding-bottom: 5px;
	cursor: pointer;
	font-weight: bold;
	user-select: none;
`;

const AccordionContentWrapper = styled.div`
	overflow: hidden;
	transition: all 0.15s linear;
`;

const AccordionContent = styled.div`
	padding: 15px 0;
`;

const AccordionIcon = styled.svg`
	${({ open }) => (open ? "transform: rotate(180deg);" : "")}
	transition: all 0.15s linear;
	width: 1.5rem;
	height: 1.5rem;
`;

function Accordion({ label = "", children, ...props }) {
	const [height, setHeight] = useState(0);
	const [open, setOpen] = useState(false);
	const list = useRef();

	useEffect(() => {
		if (open) {
			setHeight(list.current.getBoundingClientRect().height || 0);
		} else {
			setHeight(0);
		}
	}, [open]);

	return (
		<Col {...props}>
			<AccordionLabel onClick={() => setOpen(p => !p)}>
				<span>{label}</span>
				<AccordionIcon as={Icon} open={open} path={mdiChevronDown} />
			</AccordionLabel>
			<AccordionContentWrapper style={{ height: height }}>
				<AccordionContent ref={list}>{children}</AccordionContent>
			</AccordionContentWrapper>
		</Col>
	);
}
