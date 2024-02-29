"use client";
import React from "react";
import {seats} from "@/data";
import MovieContext from "@/context/MovieContext";
import {Button} from "./ui/button";

const NumberOfSeats = () => {
	const {noOfSeat, setNoOfSeats} = React.useContext(MovieContext);
	const [inputValue, setInputValue] = React.useState({});

	const changeSeats = (e) => {
		const {name, value} = e.target;

		if (value === 0) {
			return;
		} else {
			setInputValue((prevInputValues) => ({...prevInputValues, [name]: value}));
			// this will update the noOfSeat object with the new seat value
			const updatedSeats = {...noOfSeat, [name]: Number(value)};
			setNoOfSeats(updatedSeats);
			// store the updated noOfSeat object in local storage
			window.localStorage.setItem("seats", JSON.stringify(updatedSeats));
		}
		console.log(noOfSeat);
	};

	return (
		<>
			<h2 className="text-left text-2xl font-bold my-5">Select Seat</h2>
			<section className="py-4">
				{seats.map((se, indx) => (
					<Button key={indx} variant={`outline`}>
						{se} &nbsp;
						<input
							className=" bg-transparent w-[70px]"
							type="number"
							name={se}
							id={indx}
							min="0"
							max="10"
							placeholder="0"
							onChange={changeSeats}
							value={inputValue[se] || ""}
						/>
					</Button>
				))}
			</section>
		</>
	);
};

export default NumberOfSeats;
