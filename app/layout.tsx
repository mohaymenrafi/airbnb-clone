import "./globals.css";

export const metadata = {
	title: "Airbnb",
	description: "Airbnb clone with Nextjs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
