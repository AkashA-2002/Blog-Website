import Image from "next/image";
import React, { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import BreadCrumb from "../BreadCrumbs/BreadCrumbs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryOverview({ data,pageCategory,Location }) {
  const [enabled, setEnabled] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

//   const latestUpdates = data.slice(0, 3);
  // const featuredUpdates = data.slice(3, data?.length);
  const uniqueCategories = new Set();
  return (
    <section className="blog-category-overview-section">
      <div className="blog-overview-banner">
        <div className="container">
            <h1>Entertainment</h1>
            <BreadCrumb Location={Location} />
        </div>
      </div>

      {/* Featured Card Section Starts */}

      <div className="featured-card-section">
        <div className="container">
          <div className="featured-card-header">
            <h2>Featured Articles</h2>

            <div className="left-featured-card-header">
              <div className="grid-style">
                <span>
                  <i class="fa-solid fa-grip"></i>
                </span>
                <Switch.Group as="div" className="toggle-option">
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
                  <i class="fa-solid fa-list"></i>
                </span>
              </div>
            </div>
          </div>
          {enabled == true ? (
            <>
              <div className="list-card-wrapper">
                {data?.map((featuredUpdate, index) => {
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
                  if (featuredUpdate?.fields?.categories == pageCategory) {
                    return (
                      <div
                        key={index}
                        className="md:grid md:grid-cols-12 md:gap-8 card-wrapper overflow-hidden rounded-2xl border border-gray300 shadow-lg"
                      >
                        <Link
                          aria-label={featuredUpdate?.fields?.blogTitle}
                          href={`/blog/${featuredUpdate?.fields?.categories}/${featuredUpdate?.fields?.slug}`}
                        >
                          <div
                            className="card-image col-span-6"
                            style={{
                              backgroundImage: `url(
                            https:${featuredImage ? featuredImage : bannerImage}
                          )`,
                            }}
                          ></div>
                        </Link>
                        <div className="card-content col-span-6">
                          {featuredUpdate?.fields?.blogTitle && (
                            <h4>
                              <Link
                                aria-label={featuredUpdate?.fields?.blogTitle}
                                href={`/blog/${featuredUpdate?.fields?.categories}/${featuredUpdate?.fields?.slug}`}
                              >
                                {featuredUpdate?.fields?.blogTitle}
                              </Link>
                            </h4>
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
                  }
                })}
              </div>
            </>
          ) : (
            <div className="md:grid md:grid-cols-3 md:gap-8 grid-card-wrapper">
              {data?.map((featuredUpdate, index) => {
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
                if (featuredUpdate?.fields?.categories == pageCategory) {
                  return (
                    <div
                      key={index}
                      className="card-wrapper overflow-hidden rounded-2xl border border-gray300 shadow-lg"
                    >
                      <Link
                        aria-label={featuredUpdate?.fields?.blogTitle}
                        href={`/blog/${featuredUpdate?.fields?.categories}/${featuredUpdate?.fields?.slug}`}
                      >
                        <Image
                          className="card-image"
                          src={`https:${
                            featuredImage ? featuredImage : bannerImage
                          }`}
                          width={450}
                          height={350}
                          alt={featuredUpdate?.fields?.blogTitle}
                        />
                      </Link>
                      <div className="card-content">
                        {featuredUpdate?.fields?.blogTitle && (
                          <h4>
                            <Link
                              aria-label={featuredUpdate?.fields?.blogTitle}
                              href={`/blog/${featuredUpdate?.fields?.categories}/${featuredUpdate?.fields?.slug}`}
                            >
                              {featuredUpdate?.fields?.blogTitle}
                            </Link>
                          </h4>
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
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Featured Card Section Ends */}
    </section>
  );
}
