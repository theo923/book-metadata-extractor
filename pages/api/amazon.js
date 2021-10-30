// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { amazonRequest } = require("../../scripts/amazon");

export default async function amazonAPI(req, res) {
    const { url } = req.body;
    try {
        let request;
        do {
            console.log("Request");
            request = await amazonRequest(url);
        } while (Object.keys(request).length === 0);
        console.log("EndRequest");
        res.status(200).json(request);
    } catch (e) {
        res.status(201).json(e);
    }
}
