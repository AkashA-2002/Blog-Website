import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../BreadCrumbs/BreadCrumbs";

export default function BlogDetails({ data }) {
const [scrollY, setScrollY] = useState("")

  const featuredImage = data?.fields?.featuredImage?.fields?.file?.url;
  const bannerImage = data?.fields?.blogBannerImage?.fields?.file?.url;
  const maintenanceContent = data?.fields?.blogDescription
    ? documentToHtmlString(data?.fields?.blogDescription)
    : "";
  // Convert to Date object
  const dateObject = new Date(data?.sys?.createdAt);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateObject);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / 2 );
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="blog-details-section">
      <div
        className="blog-detail-banner"
        style={{
          backgroundImage: `url(https:${
            bannerImage ? bannerImage : featuredImage
          })`,
        }}
      >
        <div className="banner-content" style={{ transform: `translateY(-${scrollY}px)` }}>
          {data?.fields?.blogTitle && <h1>{data?.fields?.blogTitle}</h1>}
          <p>
            {data?.fields?.categories && (
              <span>{data?.fields?.categories}</span>
            )}{" "}
            | {formattedDate}
          </p>
        </div>
      </div>
      <div className="blog-main-description-wrapper">
        <div className="container">
        <BreadCrumb Category={data?.fields?.categories} Title={data?.fields?.blogTitle} />
          <div
            className="blog-main-description"
            dangerouslySetInnerHTML={{
              __html: maintenanceContent,
            }}
          />
        </div>
      </div>
    </div>
  );
}
