import "./globals.css";

export const metadata = {
  title: "Hackathon Timer App",
  description: "Hackathon dashboard with a timer and event links",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-600 text-white text-center">
          <h1 className="text-3xl font-bold">Hackathon Dashboard</h1>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
