import React, { useState, useEffect } from "react";
import { Seo } from "../Seo/Seo";
import Header from "../Header/Header";

export const Layout = ({ children, seoData }) => {
  return (
    <>
    <Header />
      <Seo data={seoData} />
      <main>{children}</main>
    </>
  );
};
