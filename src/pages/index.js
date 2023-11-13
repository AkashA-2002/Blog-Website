import BlogOverview from '@/components/BlogOverview/BlogOverview'
import React from 'react'
import { Client } from "../../ContentfulEntry/ContentfulEntry";
import { Layout } from '@/components/Layout/Layout';

export default function blog({blogOverviewData, seoData}) {
  return (
    <Layout seoData={seoData}>
      <BlogOverview data={blogOverviewData}/>
    </Layout>
  )
}

export async function getServerSideProps() {
    const res = await Client.getEntries({ content_type: "blogs" });
    const seo = await Client.getEntry("66IftJNk7Q3PII9mscirYT");
    const blogData = res?.items;
    const seoData = seo?.fields;
    return {
        props: {
            blogOverviewData: blogData || null,
            seoData: seoData || null,
        }
    }
}