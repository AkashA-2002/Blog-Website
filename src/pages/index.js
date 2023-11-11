import React from 'react'
import { Client } from '../../ContentfulEntry/ContentfulEntry';

export default function Home({ ctaSection }) {
  console.log(ctaSection);
  return (
    <>
    <h1>Home Page</h1>
    </>
  )
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const calltoAction = await Client.getEntry("12eBHTof6BCHT5piHvHy6D");
  return {
    props: {
      ctaSection: calltoAction?.fields,
    }
  }
}