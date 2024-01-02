import NavBar from "@/components/NavBar.jsx";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
        </div>

        <footer>
          <h2>Created By: Farhan D. Siddiqi</h2>
          <p>
            Web Portfolio{" "}
            <a href="https://farhandev.ca/" target="blank_" id="footer-link">
              here
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
