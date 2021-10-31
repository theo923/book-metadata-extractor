// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { amazonRequest } = require("../../scripts/amazon/index");
const {
    amazonDescriptionRequest,
} = require("../../scripts/amazon/description");

export default async function amazonAPI(req, res) {
    const { url, method, type } = req.body;
    try {
        let request;
        console.log("Request");
        if (method === "normal") request = await amazonRequest(url, type);
        if (method === "description")
            request = await amazonDescriptionRequest(url);
        console.log("Finished");
        res.status(200).json(request);
    } catch (e) {
        console.log(e);
        res.status(201).json(e);
    }
}
