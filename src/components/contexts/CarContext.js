import { createContext, useState, useEffect } from "react";
import defaultCars from "../../json/cars.json";

export const CarContext = createContext();

export default function CarContextProvider({ children }) {
	const [cars, setCars] = useState([]);

	useEffect(() => {
		setCars(defaultCars);
	}, []);

	function remove(carToRemove = {}) {
		setCars(p => p.filter(car => car.vin !== carToRemove.vin));
	}

	// Return array of matches
	function find(key = "vin", value = "") {
		return cars.filter(car => car[key] === value);
	}

	// Return single
	function findOne(key = "vin", value = "") {
		return cars.find(car => car[key] === value) ?? null;
	}

	//--- FILTER ---

	// Initializes state for each filter type
	const [products, setProducts] = useState(cars);
	const [search, setSearch] = useState("");
	const [make, setMake] = useState("all");
	const [model, setModel] = useState("all");
	const [fromYear, setFromYear] = useState("");
	const [toYear, setToYear] = useState("");
	const [minMiles, setMinMiles] = useState("");
	const [maxMiles, setMaxMiles] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

	// Function that changes state to user input.
	// This function is implemented as onChange on each input / select in searchForm.js (two-way data binding to the input field)

	const handleFilterChange = (e, filterType) => {
		e.preventDefault();

		//Change state
		switch (filterType) {
			case "search":
				setSearch(e.target.value.trim());
				break;

			case "make":
				setMake(e.target.value);
				break;

			case "model":
				setModel(e.target.value);
				break;

			case "fromYear":
				setFromYear(e.target.value);
				break;

			case "toYear":
				setToYear(e.target.value);
				break;

			case "minPrice":
				setMinPrice(e.target.value);
				break;

			case "maxPrice":
				setMaxPrice(e.target.value);
				break;

			case "minMiles":
				setMinMiles(e.target.value);
				break;

			case "maxMiles":
				setMaxMiles(e.target.value);
				break;

			case "clear":
				Array.from(document.querySelectorAll("input")).forEach(
					input => (input.value = "")
				);

				Array.from(document.querySelectorAll("select")).forEach(
					select => (select.value = "all")
				);
				setProducts(cars);

				break;

			//Fortsätt med de andra filter typerna här
			default:
				break;
		}
	};

	// Here, the actual filtering takes place -->  if statement for each filter type.

	useEffect(() => {
		let filteredProducts = cars;

		if (make === "all") {
			filteredProducts = defaultCars;
		} else {
			filteredProducts = filteredProducts.filter(car => car.make === make);
		}

		if (search !== "") {
			filteredProducts = filteredProducts.filter(
				car =>
					car.model.toLowerCase().includes(search.toLowerCase()) ||
					car.make.toLowerCase().includes(search.toLowerCase()) ||
					String(car.year).toLowerCase().includes(search.toLowerCase()) ||
					String(car.miles).toLowerCase().includes(search.toLowerCase()) ||
					String(car.vin).toLowerCase().includes(search.toLowerCase()) ||
					String(car.city).toLowerCase().includes(search.toLowerCase()) ||
					String(car.descShort).toLowerCase().includes(search.toLowerCase()) ||
					String(car.descLong).toLowerCase().includes(search.toLowerCase()) ||
					String(car.price).toLowerCase().includes(search.toLowerCase())
			);
		}

		if (model !== "all") {
			filteredProducts = filteredProducts.filter(car => car.model === model);
		}

		if (fromYear !== "") {
			filteredProducts = filteredProducts.filter(car => car.year >= fromYear);
		}

		if (toYear !== "") {
			filteredProducts = filteredProducts.filter(car => car.year < toYear);
		}

		if (minPrice !== "") {
			filteredProducts = filteredProducts.filter(car => car.price >= minPrice);
		}

		if (maxPrice !== "") {
			filteredProducts = filteredProducts.filter(car => car.price <= maxPrice);
		}

		if (minMiles !== "") {
			filteredProducts = filteredProducts.filter(car => car.miles >= minMiles);
		}

		if (maxMiles !== "") {
			filteredProducts = filteredProducts.filter(car => car.miles <= maxMiles);
		}

		//Fortsätt if med  filter typerna här
		setProducts(filteredProducts); // Product state is what we use in productCard.js to map out all cars
	}, [
		search,
		make,
		model,
		fromYear,
		toYear,
		minPrice,
		maxPrice,
		minMiles,
		maxMiles,
		cars,
	]);

	return (
		<CarContext.Provider
			value={{
				cars,
				find,
				findOne,
				remove,
				handleFilterChange,
				products,
			}}
		>
			{children}
		</CarContext.Provider>
	);
}
