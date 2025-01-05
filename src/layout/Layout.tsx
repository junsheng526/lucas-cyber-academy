import React, { FC } from "react";
import Navbar from "../components/organisms/Navbar";
import Chatbot from "./chatbot";
import Footer from "../components/organisms/footer/Footer";
import BgGlassmorphism from "../components/atoms/background/BgGlassmorphism";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App">
      <Navbar />
      <main className="nc-PageHome relative overflow-hidden flex justify-center">
        {children}
      </main>
      {/* <Chatbot /> */}
      <Footer />
    </div>
  );
};

export default Layout;
