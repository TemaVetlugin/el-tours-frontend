import { GetServerSideProps } from 'next';

import { sitemapRequest } from "shared/requests/api";

const SitemapPage = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const { data } = await sitemapRequest();
    res.setHeader("Content-Type", "text/xml");
    res.write(data);
    res.end();

    return {
        props: {},
    }
}

export default SitemapPage;
