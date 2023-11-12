import React from "react";
import { Client } from "../../../ContentfulEntry/ContentfulEntry";

export default function blogurl({ blogData }) {
  console.log(blogData);
  return <div>blogurl</div>;
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
    },
  };
}
