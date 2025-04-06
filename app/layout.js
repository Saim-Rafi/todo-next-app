import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/to-do-list.png" />
      </head>
      <body>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
        />
      </body>
    </html>
  );
}
