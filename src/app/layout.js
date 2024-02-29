import {Inter} from "next/font/google";
import "./globals.css";
import MovieContextProvider from "@/context/MovieContextProvider";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
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
