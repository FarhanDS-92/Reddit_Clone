import NavBar from "@/components/NavBar.jsx";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
