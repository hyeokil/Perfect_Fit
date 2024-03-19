import Footer from "@/components/layout/Footer";
import Header from '@components/layout/Header'
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header title="부르기" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
