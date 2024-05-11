import MovieContext from "@/context/MovieContext";
import {Skeleton} from "@/components/ui/skeleton";

import React from "react";
import {seats} from "@/data";

function BookingDetailScreen() {
	const {lastBookingDetails} = React.useContext(MovieContext);
	const [loader, setLoader] = React.useState(false);
	const [lastBooking, setLastBooking] = React.useState("");

	const getLastBookingDetails = async () => {
		try {
			setLoader(true);

			await new Promise((resolve) => setTimeout(resolve, 5000));

			const res = await fetch(`https://b-moviebookingapp-mern-2.onrender.com/api/v1/booking`, {
				method: "GET",
			});
			const data = await res.json();
			setLastBooking(data.data);
			setLoader(false);
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		getLastBookingDetails(); //calling last booking api
	}, [lastBookingDetails]);

	return (
		<div className="h-50 border py-10 mb-5 px-8">
			<h2 className="text-center font-mono font-bold pb-5">Last Booking Details:</h2>
			{loader ? (
				<div className="h-50 flex flex-col items-center justify-center space-y-5">
					<Skeleton className="h-8 w-full rounded-xl" />
					<div className="flex flex-col items-center w-full">
						<Skeleton className="h-4 w-3/4 mb-2" />
						<Skeleton className="h-4 w-3/4 mb-2" />
					</div>
				</div>
			) : lastBooking ? (
				<div className="flex flex-grow justify-center gap-3 items-center flex-wrap">
					<div className="flex justify-center">
						<p className="text-center font-mono font-bold px-2">Seats:</p>
						<ul className="gap-2">
							{seats
								.filter((seat) => Number(lastBooking ? lastBooking?.seats[seat] : "") > 0)
								.map((seat, index) => {
									return (
										<li className=" text-center" key={index}>
											{seat}: {Number(lastBooking ? lastBooking?.seats[seat] : "")}
										</li>
									);
								})}
						</ul>
					</div>
					<p className="text-center">
						Slot: <span>{lastBooking?.slot}</span>
					</p>
					<p className="text-center">
						Movie: <span>{lastBooking?.movie}</span>
					</p>
				</div>
			) : (
				<p className="text-center">No Booking Found!</p>
			)}
		</div>
	);
}

export default BookingDetailScreen;
