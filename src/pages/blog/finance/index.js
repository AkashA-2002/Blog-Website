import React from 'react'
import { Client } from '../../../../ContentfulEntry/ContentfulEntry';
import { Layout } from '@/components/Layout/Layout';
import CategoryOverview from '@/components/CategoryOverview/CategoryOverview';

export default function finance({blogOverviewData, seoData}) {
  return (
    <Layout seoData={seoData}>
      <CategoryOverview data={blogOverviewData} pageCategory="finance" Location="Finance" title="Finance"/>
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