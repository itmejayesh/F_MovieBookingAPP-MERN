"use client";
import {useEffect, useState} from "react";
import MovieContext from "./MovieContext";

const MovieContextProvider = ({children}) => {
	//STATE VARIABLES
	const [lastBookingDetails, setLastBookingDetails] = useState(null);
	const [errorPopup, setErrorPopup] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [time, setTime] = useState("");
	const [movie, setMovie] = useState("");
	const [noOfSeat, setNoOfSeats] = useState({
		A1: "0",
		A2: "0",
		A3: "0",
		A4: "0",
		D1: "0",
		D2: "0",
	});
	//this function is used  to make a post request to the server with the booking details
	const handlePostBookingRquest = async () => {
		try {
			const response = await fetch(`https://b-moviebookingapp-mern-2.onrender.com/api/v1/booking`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({movie: movie, slot: time, seats: noOfSeat}),
			});

			const data = await response.json();

			setErrorPopup(true);
			setErrorMessage(data.message);
			setLastBookingDetails(data.data);
			console.log(data.data);

			if (response.status === 200) {
				setTime("");
				setMovie("");
				setNoOfSeats({A1: 0, A2: 0, A3: 0, A4: 0, D1: 0, D2: 0});
				window.localStorage.clear();
			}
		} catch (error) {
			console.error("error sending data to server", error);
			return false;
		}
	};

	useEffect(() => {
		const movie = window.localStorage.getItem("movie");
		const slot = window.localStorage.getItem("time");
		const seats = window.localStorage.getItem("seats");

		if (movie || slot || seats) {
			setMovie(movie);
			setTime(slot);
			setNoOfSeats(seats);
		}
	}, [lastBookingDetails]);

	return (
		<MovieContext.Provider
			value={{
				handlePostBookingRquest,
				movie,
				setMovie,
				time,
				setTime,
				noOfSeat,
				setNoOfSeats,
				lastBookingDetails,
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};

export default MovieContextProvider;
