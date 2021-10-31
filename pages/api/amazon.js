// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { amazonRequest } = require("../../scripts/amazon");

export default async function amazonAPI(req, res) {
    const { url } = req.body;
    try {
        let request;
        let attempt = 0;
        do {
            console.log("Request");
            request = await amazonRequest(url);
            console.log("EndRequest");
            attempt++;
        } while (attempt <= 5 && Object.keys(request).length === 0);
        console.log("Finished");
        res.status(200).json(request);
    } catch (e) {
        res.status(201).json(e);
    }
}
