import React, { useState, useEffect } from "react";
import { Seo } from "../Seo/Seo";

export const Layout = ({ children, seoData }) => {
  return (
    <>
      <Seo data={seoData} />
      <main>{children}</main>
    </>
  );
};
