import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "shared/server";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    try {
        Redis.flush();
        return response.json({ status: 'success' })
    } catch (err) {
        return response.status(500).json({
            description: 'Error revalidating'
        });
    }
}
