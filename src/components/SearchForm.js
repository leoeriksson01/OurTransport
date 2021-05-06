import React, { useState, useContext } from "react";
import { CarContext } from "../components/contexts/CarContext";
import styles from "../css/SearchForm.module.css";
import filterIcon from "../assets/filter.svg";

const SearchForm = () => {
	// Car data
	const { cars, handleFilterChange } = useContext(CarContext);

	// Set and setState being initialized
	const [show, setShow] = useState(false); // In order to show form on tablet and mobile

	// Toggle true/false to be able to show form on tablet and mobile
	const handleShow = () => {
		setShow(show => !show);
	};

	// Add class active in order to show form on toggle
	const activeClass = show ? styles.active : "";

	function getAllCarOptions(property = "make") {
		return [...new Set(cars.map(car => car[property]))].sort();
	}

	return (
		<div className={styles.search_form_wrapper}>
			<div className={styles.heading} onClick={handleShow}>
				<div>
					<p>Filter</p>
				</div>
				<div>
					<img src={filterIcon} alt="filter" />
				</div>
			</div>

			<form
				onReset={e => handleFilterChange(e, "clear")}
				className={`${activeClass} ${styles.form}`}
			>
				<input
					type="text"
					placeholder="Search..."
					onChange={e => handleFilterChange(e, "search")}
				/>

				{/* Make */}
				<label htmlFor="make">Make</label>
				<div className={styles.select_wrapper}>
					<select onChange={e => handleFilterChange(e, "make")}>
						<option value="all">All</option>
						{getAllCarOptions("make").map((make, i) => (
							<option key={i} value={make}>
								{make}
							</option>
						))}
					</select>
				</div>

				{/* Model */}
				<label htmlFor="model">Model</label>
				<div className={styles.select_wrapper}>
					<select onChange={e => handleFilterChange(e, "model")}>
						<option value="all">All</option>
						{getAllCarOptions("model").map((model, i) => (
							<option key={i} value={model}>
								{model}
							</option>
						))}
					</select>
				</div>

				{/* Year */}
				<label className={styles.form_label} htmlFor="year">
					Year
				</label>
				<div className={styles.min_max_wrapper}>
					<input
						type="number"
						onChange={e => handleFilterChange(e, "fromYear")}
						placeholder="1960"
					/>
					<input
						type="number"
						onChange={e => handleFilterChange(e, "toYear")}
						placeholder="2021"
					/>
				</div>

				{/* Price */}
				<label htmlFor="price">Price</label>
				<div className={styles.min_max_wrapper}>
					<input
						type="number"
						onChange={e => handleFilterChange(e, "minPrice")}
						placeholder="0"
					/>
					<input
						type="number"
						onChange={e => handleFilterChange(e, "maxPrice")}
						placeholder="737 527"
					/>
				</div>

				{/* Miles */}
				<label htmlFor="Miles">Miles</label>
				<div className={styles.min_max_wrapper}>
					<input
						type="number"
						onChange={e => handleFilterChange(e, "minMiles")}
						placeholder="0"
					/>
					<input
						type="number"
						onChange={e => handleFilterChange(e, "maxMiles")}
						placeholder="67 034"
					/>
				</div>
				<button type="reset" className={styles.clear_btn}>
					Clear
				</button>
			</form>
		</div>
	);
};

export default SearchForm;
