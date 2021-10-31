// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { amazonRequest } = require("../../scripts/amazon");

export default async function amazonAPI(req, res) {
    const { url } = req.body;
    // let request;
    // let attempt = 0;
    try {
        console.log("Request");
        // while (attempt <= 5 && Object.keys(request).length === 0) {
        // request = await amazonRequest(url);
        //     console.log("EndRequest");
        //     attempt++;
        // }
        console.log("Finished");
        res.status(200).json(await amazonRequest(url));
    } catch (e) {
        res.status(201).json(e);
    }
}
