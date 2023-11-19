import { LinkChecker } from "linkinator";

interface LinkType {
    url: string;
    status?: number;
    state: string;
}

export const POST = async (req: Request) => {
    const { url } = await req.json();

    if (!url)
        return Response.json({ message: "Link is required" }, { status: 403 });

    try {
        const checker = new LinkChecker();
        const brokenLinks: LinkType[] = [];
        const workingLinks: LinkType[] = [];
        const notFoundLinks: LinkType[] = [];

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
            if (url.status === 404) {
                notFoundLinks.push({
                    url: url.url,
                    status: url.status,
                    state: url.state,
                });
            }
        });

        await checker.check({ path: url });

        return Response.json({ brokenLinks, workingLinks, notFoundLinks }, { status: 201 });
    } catch (error: any) {
        console.log(error)
        return Response.json({ message: error.message }, { status: 500 });
    }
};
