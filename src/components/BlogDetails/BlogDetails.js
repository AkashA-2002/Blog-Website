import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import React from "react";

export default function BlogDetails({ data }) {
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
        <div className="banner-content">
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
