import { createClient } from "contentful";

function generateSiteMap(serviceData) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${serviceData
      ?.map((id) => {
        console.log(id);
        return `
       <url>
           <loc>${`https://checkout-blogs.vercel.app/blog/${id?.fields?.categories}/${id?.fields?.slug}/`}</loc>
           <lastmod>${id?.sys?.updatedAt}</lastmod>
       </url>
     `;
      })
      .join("")}
   </urlset>
 `;
}

function SitemapDynamic() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
  });
  const service = await client.getEntries({ content_type: "blogs" });

  const serviceData = service.items;

  // We generate the XML sitemap with the given data
  const sitemap = generateSiteMap(
    serviceData
  );
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SitemapDynamic;
