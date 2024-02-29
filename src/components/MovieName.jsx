"use client";
import React from "react";
import {moviesList} from "@/data";
import {Toggle} from "./ui/toggle";
import MovieContext from "@/context/MovieContext";

const MovieName = () => {
	const context = React.useContext(MovieContext);
	const {movie, setMovie} = context;

	const handleClick = (movieName) => {
		const checkMovieInLocalStorage = window.localStorage.getItem("movie");
		if (!checkMovieInLocalStorage) {
			window.localStorage.setItem("movie", movieName);
			setMovie(movieName);
			console.log("movie is added", movie);
		} else if (checkMovieInLocalStorage === movieName) {
			window.localStorage.removeItem("movie", movieName);
			setMovie("");
			console.log("this movie is removed", movie);
		} else {
			console.error("please select only movie at a time");
		}
	};

	return (
		<>
			<h2 className="text-left text-2xl font-bold mb-5">Movie Name</h2>
			<section className="py-4">
				{moviesList.map((mv, indx) => (
					<Toggle className="px-3" key={indx} variant={`outline`}>
						<p
							onClick={() => {
								handleClick(mv);
							}}
						>
							{mv}
						</p>
					</Toggle>
				))}
			</section>
		</>
	);
};

export default MovieName;
