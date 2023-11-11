import BlogOverview from '@/components/BlogOverview/BlogOverview'
import React from 'react'
import { Client } from '../../../ContentfulEntry/ContentfulEntry';

export default function blog({blogOverviewData}) {
  return (
    <BlogOverview data={blogOverviewData}/>
  )
}

export async function getServerSideProps() {
    const res = await Client.getEntries({ content_type: "blogs" });
    const blogData = res.items;
    return {
        props: {
            blogOverviewData: blogData,
        }
    }
}