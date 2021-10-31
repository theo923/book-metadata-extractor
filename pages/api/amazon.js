// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { amazonRequest } = require("../../scripts/amazon");

export default async function amazonAPI(req, res) {
    const { url } = req.body;
    // let attempt = 0;
    try {
        let request;
        console.log("Request");
        // while (attempt <= 5 && Object.keys(request).length === 0) {
        // request = await amazonRequest(url);
        //     console.log("EndRequest");
        //     attempt++;
        // }
        request = await amazonRequest(url);
        console.log("Finished");
        res.status(200).json(request);
    } catch (e) {
        console.log(e);
        res.status(201).json(e);
    }
}
