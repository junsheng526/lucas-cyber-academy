import React, { FC } from "react";
import Navbar from "../../organisms/Navbar";
import Footer from "../../organisms/footer/Footer";

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
