import "./globals.css";

export const metadata = {
  title: "Hackathon Timer App",
  description: "Hackathon dashboard with a timer and event links",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
