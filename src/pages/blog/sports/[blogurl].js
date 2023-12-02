import React from "react";
import { Client } from "../../../../ContentfulEntry/ContentfulEntry";
import { Layout } from "@/components/Layout/Layout";
import BlogDetails from "@/components/BlogDetails/BlogDetails";
import { Fragment } from "react";
import SocialShare from "@/components/SocialShare/SocialShare";

export default function blogurl({ blogData, blogurl }) {
  return (
    <>
      {blogData?.map((blog, index) => {
        if (blog?.fields?.slug === blogurl) {
          return (
            <Layout seoData={blog?.fields} key={index}>
              <BlogDetails data={blog} />
              <SocialShare data={blog}/>
            </Layout>
          );
        }
      })}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const blogurl = params?.blogurl;
  let url = "";
  const res = await Client?.getEntries({
    content_type: "blogs",
    "fields.slug": blogurl,
    include: 10,
  });
  const blogTemplateData = res?.items;

  blogTemplateData?.forEach((page) => {
    url = page?.fields?.slug;
  });
  if (url != blogurl) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
  return {
    props: {
      blogData: blogTemplateData || null,
      blogurl: blogurl || null,
    },
  };
}
