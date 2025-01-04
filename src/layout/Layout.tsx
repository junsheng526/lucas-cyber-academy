import React, { FC } from "react";
import Navbar from "../components/Navbar";
import Chatbot from "./chatbot";
import Footer from "../components/footer/Footer";
import BgGlassmorphism from "../components/background/BgGlassmorphism";

interface LayoutProps {
  children: React.ReactNode;
  isShowBg?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, isShowBg = true }) => {
  return (
    <div className="App">
      <Navbar />
      <main className="nc-PageHome relative overflow-hidden flex justify-center">
        {children}
        {isShowBg && <BgGlassmorphism />}
      </main>
      {/* <Chatbot /> */}
      <Footer />
    </div>
  );
};

export default Layout;
