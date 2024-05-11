"use client";
import React from "react";
import {Button} from "@/components/ui/button";
import BookingDetailScreen from "@/components/ui/BookingDetailScreen";
import MovieName from "@/components/MovieName";
import NumberOfSeats from "@/components/NumberOfSeats";
import TimeShedule from "@/components/TimeShedule";
import MovieContext from "@/context/MovieContext";
import {useToast} from "@/components/ui/use-toast";

export default function Home() {
	const {movie, time, noOfSeat, handlePostBookingRquest} = React.useContext(MovieContext);
	const {toast} = useToast();

	const checkZeroSeatsValidity = (seats) => {
		for (let seat in seats) {
			if (Number(seats[seat]) > 0) {
				// if statement is true then return false and exit form the next time
				return false;
			}
		}
		return true;
	};

	const handleBookNow = () => {
		if (!movie) {
			toast({description: "Please Select Movie"});
			console.log("Please Select Movie");
		} else if (!time) {
			toast({description: "Please Select Timings"});
			console.log("Please Select Timings");
		} else if (checkZeroSeatsValidity(noOfSeat)) {
			toast({description: "Please Select Seat in Numbers"});
			console.log("Please Select Seat in Numbers");
		} else {
			handlePostBookingRquest();
			toast({description: "Booking successfully"});
		}

		console.log("button clicked");
	};

	return (
		<main
			className=" flex min-h-screen flex-col
     items-center justify-between px-20 py-10"
		>
			<div className="font-mono font-bold text-2xl text-red-500 underline underline-offset-8">Public Movie Booking App</div>
			<div
				className="mb-32 flex flex-col text-center text-white
        lg:text-left p-9"
			>
				{/* Booking Screen Popup */}
				<BookingDetailScreen />
				{/* Select Movie */}
				<MovieName />
				{/* Select Seat */}
				<NumberOfSeats />
				{/* Select Time */}
				<TimeShedule />
				<Button onClick={() => handleBookNow()}>Book Now</Button>
			</div>
		</main>
	);
}
