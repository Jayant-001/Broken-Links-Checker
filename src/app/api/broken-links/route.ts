import { LinkChecker } from "linkinator";

interface LinkType {
    url: string;
    status?: number;
    state: string;
}

export const POST = async (req: Request) => {
    const { url } = await req.json(); // extract `url` from request body

    // if url not found send Invalid request 
    if (!url)
        return Response.json({ message: "Link is required" }, { status: 400 });

    try {
        const checker = new LinkChecker(); // create a new instance of LinkChecker
        const brokenLinks: LinkType[] = []; // store all broken or dead links
        const workingLinks: LinkType[] = []; // store all working links
        const notFoundLinks: LinkType[] = []; // store only links with status - 404 not found

        // return all links status
        checker.on("link", (url) => {
            if (url.state === "BROKEN")
                brokenLinks.push({
                    url: url.url,
                    status: url.status,
                    state: url.state,
                });
            else
                workingLinks.push({
                    url: url.url,
                    status: url.status,
                    state: url.state,
                });
            // check only link with status code 404 (not found)
            if (url.status === 404) {
                notFoundLinks.push({
                    url: url.url,
                    status: url.status,
                    state: url.state,
                });
            }
        });

        await checker.check({ path: url }); // wait while all links are checking

        return Response.json({ brokenLinks, workingLinks, notFoundLinks }, { status: 201 });
    } catch (error: any) {
        console.log(error)
        return Response.json({ message: error.message }, { status: 500 });
    }
};
