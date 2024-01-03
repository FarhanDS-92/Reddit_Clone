import NavBar from "@/components/NavBar.jsx";
import "./globals.css";

export const dynamic = "force-dynamic";

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
          <div id="external-links">
            <p>
              Web Portfolio:
              <a href="https://farhandev.ca/" target="blank_" id="footer-link">
                here
              </a>
            </p>
            <p>
              LinkedIn:
              <a
                href="https://www.linkedin.com/in/farhan-d-siddiqi-web-developer/"
                target="blank_"
                id="footer-link"
              >
                here
              </a>
            </p>
            <p>
              Github:
              <a
                href="https://github.com/FarhanDS-92"
                target="blank_"
                id="footer-link"
              >
                here
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
