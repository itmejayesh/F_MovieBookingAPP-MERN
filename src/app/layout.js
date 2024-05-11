import {Inter} from "next/font/google";
import "./globals.css";
import MovieContextProvider from "@/context/MovieContextProvider";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
	title: "Booking.io",
	description: "Public Movie Booking App",
	icons: {
		icon: [
			{
				type: "image/svg+xml",
				url: "/icon.svg",
			},
		],
	},
};

export default function RootLayout({children}) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<MovieContextProvider>
					{children}
					<Toaster />
				</MovieContextProvider>
			</body>
		</html>
	);
}
