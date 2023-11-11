import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BlogOverview({ data }) {
  const [enabled, setEnabled] = useState(false);

  const latestUpdates = data.slice(0, 3);
  const featuredUpdates = data.slice(3, data?.length);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    pauseOnHover: true,
  };
  return (
    <section className="blog-overview-section">
      {/* Slider Section Starts */}
      <Slider {...settings}>
        {latestUpdates?.map((blog, index) => {
          const featuredImage = blog?.fields?.featuredImage?.fields?.file?.url;
          const bannerImage = blog?.fields?.blogBannerImage?.fields?.file?.url;
          // Convert to Date object
          const dateObject = new Date(blog?.sys?.createdAt);

          // Format the date
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(dateObject);
          return (
            <div key={index}>
              <div className="blog-latest-card md:grid md:grid-cols-2">
                <div
                  className="blog-featured-image"
                  style={{
                    backgroundImage: `url(https:${
                      featuredImage ? featuredImage : bannerImage
                    })`,
                  }}
                ></div>
                <div className="blog-featured-content">
                  {blog?.fields?.blogTitle && (
                    <h1>{blog?.fields?.blogTitle}</h1>
                  )}
                  {blog?.fields?.miniDescription && (
                    <p className="description">{blog?.fields?.miniDescription}</p>
                  )}
                  <p className="published-date">{formattedDate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      {/* Slider Section Ends */}

      {/* Featured Card Section Starts */}

      <div className="featured-card-section">
        <div className="container">
          <div className="featured-card-header">
            <h2>Featured Articles</h2>
            <div className="grid-style">
              <span>
                <i class="fa-solid fa-grip"></i>
              </span>
              <Switch.Group as="div" className="toggle-option">
                {console.log(enabled)}
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={classNames(
                    enabled ? "bg-indigo-600" : "bg-indigo-800",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <span>
                <FontAwesomeIcon icon={faList} />
              </span>
            </div>
          </div>
          {enabled == true ? (
            <>
              <div className="list-card-wrapper">
                {featuredUpdates?.map((featuredUpdate, index) => {
                  console.log(featuredUpdate);
                  const featuredImage =
                    featuredUpdate?.fields?.featuredImage?.fields?.file?.url;
                  const bannerImage =
                    featuredUpdate?.fields?.blogBannerImage?.fields?.file?.url;
                  // Convert to Date object
                  const dateObject = new Date(featuredUpdate?.sys?.createdAt);

                  // Format the date
                  const formattedDate = new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(dateObject);
                  return (
                    <div
                      key={index}
                      className="md:grid md:grid-cols-12 md:gap-8 card-wrapper overflow-hidden rounded-2xl border border-gray300 shadow-lg"
                    >
                      <div
                        className="card-image col-span-6"
                        style={{
                          backgroundImage: `url(
                            https:${
                              featuredImage ? featuredImage : bannerImage
                            }
                          )`,
                        }}
                      ></div>
                      <div className="card-content col-span-6">
                        {featuredUpdate?.fields?.blogTitle && (
                          <h4>{featuredUpdate?.fields?.blogTitle}</h4>
                        )}
                        {featuredUpdate?.fields?.miniDescription && (
                          <p className="card-description">
                            {featuredUpdate?.fields?.miniDescription}
                          </p>
                        )}
                        <div className="published-date">
                          <p>{formattedDate}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="md:grid md:grid-cols-3 md:gap-8 grid-card-wrapper">
              {featuredUpdates?.map((featuredUpdate, index) => {
                console.log(featuredUpdate);
                const featuredImage =
                  featuredUpdate?.fields?.featuredImage?.fields?.file?.url;
                const bannerImage =
                  featuredUpdate?.fields?.blogBannerImage?.fields?.file?.url;
                // Convert to Date object
                const dateObject = new Date(featuredUpdate?.sys?.createdAt);

                // Format the date
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(dateObject);
                return (
                  <div
                    key={index}
                    className="card-wrapper overflow-hidden rounded-2xl border border-gray300 shadow-lg"
                  >
                    <Image
                      className="card-image"
                      src={`https:${
                        featuredImage ? featuredImage : bannerImage
                      }`}
                      width={450}
                      height={350}
                    />
                    <div className="card-content">
                      {featuredUpdate?.fields?.blogTitle && (
                        <h4>{featuredUpdate?.fields?.blogTitle}</h4>
                      )}
                      {featuredUpdate?.fields?.miniDescription && (
                        <p className="card-description">
                          {featuredUpdate?.fields?.miniDescription}
                        </p>
                      )}
                      <div className="published-date">
                        <p>{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Featured Card Section Ends */}
    </section>
  );
}
