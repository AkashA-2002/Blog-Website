import * as React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Head from "next/head";

export const Seo = ({ location, data }) => {
  const { asPath } = useRouter();
  location = asPath;
  let socialCard = data?.socialCardImage?.fields?.file?.url;
  let socialCardimage = socialCard ? socialCard : "";
  const metaDescription =
    data?.metaDescription ||
    "SCube Builds Fast, Secure and Composable website that focuses on outstanding customer experience.";
  const keywords = data?.metaKeyword ? data?.metaKeyword : "Checkout Blog";
  const metaTitle = data?.metaTitle ? data?.metaTitle : "Checkout Blog";
  const canonicalUrl = "https://checkout-blogs.vercel.app" + `${location ? location : ""}`;
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="author" content="@akash" data-react-helmet="true" />
        <meta
          name="description"
          content={metaDescription}
          data-react-helmet="true"
        ></meta>
        <meta
          name="keywords"
          content={keywords}
          data-react-helmet="true"
        ></meta>
        <meta property="og:type" content="website" data-react-helmet="true" />
        <meta
          property="og:title"
          content={metaTitle}
          data-react-helmet="true"
        ></meta>
        <meta
          property="og:description"
          content={metaDescription}
          data-react-helmet="true"
        ></meta>
        <meta
          property="og:url"
          content={canonicalUrl}
          data-react-helmet="true"
        ></meta>
        <meta
          property="og:image"
          content={socialCardimage}
          data-react-helmet="true"
        ></meta>
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="630"></meta>
        <meta
          name="twitter:card"
          content="summary_large_image"
          data-react-helmet="true"
        />
        <meta
          name="twitter:title"
          content={metaTitle}
          data-react-helmet="true"
        ></meta>
        <meta
          name="twitter:description"
          content={metaDescription}
          data-react-helmet="true"
        ></meta>
        <meta
          property="twitter:image"
          content={socialCardimage}
          data-react-helmet="true"
        ></meta>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
    </>
  );
};
Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  keywords: ``,
};

Seo.propTypes = {
  description: PropTypes.string.isRequired,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.string,
};
