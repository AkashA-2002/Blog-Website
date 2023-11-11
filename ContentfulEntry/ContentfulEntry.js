import { createClient } from "contentful";

const Client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export {
	Client
};
