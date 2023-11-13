import React from "react";
import { Client } from "../../../../ContentfulEntry/ContentfulEntry";
import { Layout } from "@/components/Layout/Layout";
import BlogDetails from "@/components/BlogDetails/BlogDetails";
import SocialShare from "@/components/SocialShare/SocialShare";

export default function movieurl({ blogData, movieurl }) {
  return (
    <>
      {blogData?.map((blog, index) => {
        if (blog?.fields?.slug === movieurl) {
          return (
            <Layout key={index}>
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
  const movieurl = params?.movieurl;
  console.log(movieurl);
  let url = "";
  const res = await Client?.getEntries({
    content_type: "blogs",
    "fields.slug": movieurl,
    include: 10,
  });
  const blogTemplateData = res?.items;

  blogTemplateData?.forEach((page) => {
    url = page?.fields?.slug;
  });
  if (url != movieurl) {
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
      movieurl: movieurl || null,
    },
  };
}
