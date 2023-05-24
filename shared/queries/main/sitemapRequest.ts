import { request } from "shared/utilities";

export const sitemapRequest = async () => {
    return await request.get<string>({ endpoint: '/sitemap' });
}
