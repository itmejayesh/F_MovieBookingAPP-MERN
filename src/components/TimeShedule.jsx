"use client";
import React from "react";
import {Toggle} from "./ui/toggle";
import {slots} from "@/data";
import MovieContext from "@/context/MovieContext";

const TimeShedule = () => {
	const {setTime} = React.useContext(MovieContext);

	const handleChangeTimeonSubmit = (slotTime) => {
		console.log(slotTime);
		setTime(slotTime);
		window.localStorage.setItem("slot", slotTime);
	};

	return (
		<>
			<h2 className="text-left text-2xl font-bold my-5">Select Timings</h2>
			<section className="py-4">
				{slots.map((sl, indx) => {
					return (
						<Toggle key={indx} variant="outline" onClick={() => handleChangeTimeonSubmit(sl)}>
							{sl}
						</Toggle>
					);
				})}
			</section>
		</>
	);
};

export default TimeShedule;
