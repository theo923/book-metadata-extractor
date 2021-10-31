// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function amazonAPI(req, res) {
    const { string } = req.body;
    // let attempt = 0;
    try {
        res.set({
            "Content-Disposition": 'attachment; filename="metadata"',
        });
        res.send(string);
        res.status(200).json(request);
    } catch (e) {
        console.log(e);
        res.status(201).json(e);
    }
}
