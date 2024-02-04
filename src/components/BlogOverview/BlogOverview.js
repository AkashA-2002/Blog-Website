import Image from "next/image";
import Slider from "react-slick";
import React, { useState, Fragment, Suspense } from "react";
import { Switch } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Loading from "../Loading/Loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BlogOverview({ data }) {
  const [enabled, setEnabled] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [loadMore, setLoadMore] = useState(6);

  const latestUpdates = data.slice(0, 3);
  // const featuredUpdates = data.slice(3, data?.length);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    pauseOnHover: true,
  };
  const uniqueCategories = new Set();

  // Load More button

  const handleClick = () => {
    setLoadMore(loadMore + 6);
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
                  <ErrorBoundary fallback={<Loading />}>
                    <h1>
                      <Link
                        aria-label={blog?.fields?.blogTitle}
                        href={`/blog/${blog?.fields?.categories}/${blog?.fields?.slug}`}
                      >
                        {blog?.field.blogTitle}
                      </Link>
                    </h1>
                  </ErrorBoundary>
                  {blog?.fields?.miniDescription && (
                    <p className="description">
                      {blog?.fields?.miniDescription}
                    </p>
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

            <div className="left-featured-card-header">
              <div className="blog-filter-section">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize">
                    {filterCategory === "all"
                      ? "Filter By Categories"
                      : filterCategory}
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none filter-option">
                      <ul>
                        <li onClick={() => setFilterCategory("all")}>
                          <div className="py-2">
                            <Menu.Item>
                              <span>All</span>
                            </Menu.Item>
                          </div>
                        </li>
                        {data?.map((category, index) => {
                          const categories = category?.fields?.categories;
                          if (categories && !uniqueCategories.has(categories)) {
                            uniqueCategories.add(categories);

                            return (
                              <li
                                key={index}
                                onClick={() => setFilterCategory(categories)}
                              >
                                <div className="py-2">
                                  <Menu.Item>
                                    <span>{categories}</span>
                                  </Menu.Item>
                                </div>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

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
                {data?.slice(0, loadMore).map((featuredUpdate, index) => {
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
                  if (filterCategory == featuredUpdate?.fields?.categories) {
                    return (
                      <div
                        key={index}
                        className="md:grid md:grid-cols-12 md:gap-8 card-wrapper overflow-hidden rounded-2xl border border-gray300 shadow-lg"
                      >
                        <div
                          className="card-image col-span-6"
                          style={{
                            backgroundImage: `url(
                            https:${featuredImage ? featuredImage : bannerImage}
                          )`,
                          }}
                        ></div>
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
                  } else if (filterCategory == "all") {
                    return (
                      <div
                        key={index}
                        className="md:grid md:grid-cols-12 md:gap-8 card-wrapper overflow-hidden rounded-2xl border border-gray300 shadow-lg"
                      >
                        <div
                          className="card-image col-span-6"
                          style={{
                            backgroundImage: `url(
                        https:${featuredImage ? featuredImage : bannerImage}
                      )`,
                          }}
                        ></div>
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
                  } else {
                    return null;
                  }
                })}
              </div>
            </>
          ) : (
            <>
              <div className="md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-8 grid-card-wrapper">
                {data?.slice(0, loadMore)?.map((featuredUpdate, index) => {
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
                  if (filterCategory == featuredUpdate?.fields?.categories) {
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
                  } else if (filterCategory == "all") {
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
                  } else {
                    return null;
                  }
                })}
              </div>
            </>
          )}
          {loadMore < data?.length && (
            <div className="load-more-button">
              <button
                class="text-center py-2 px-4 border border-gray-400 rounded shadow"
                onClick={handleClick}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Card Section Ends */}
    </section>
  );
}
