import BrokenLinks from "@/components/BrokenLinks";
import axios from "axios";
import * as cheerio from "cheerio";
import React from "react";


const getAllLinks = async (url: string) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const links: string[] = [];

        // Load the HTML content into Cheerio
        const $ = cheerio.load(html);

        // Extract all anchor tags
        const anchorTags = $("a");

        // Loop through each anchor tag
        for (let i = 0; i < anchorTags.length; i++) {
            const href = $(anchorTags[i]).attr("href");

            // Skip if the href attribute is undefined or not starts with 'http'
            if (!href || !href.startsWith("http")) {
                continue;
            }
            links.push(href);
        }
        return links;
    } catch (error: any) {
        console.log("dfgdfgfd", error.message);
        return [];
    }
};



const TextPage: React.FC = async () => {
    const links = await getAllLinks("https://www.npmjs.com/package/cheerio");

    // console.log("All", links)

    return (
        <div>
            <h1 className="text-center text-2xl">links</h1>
            {/* {links.map((link, id) => (
                <p key={id}>{link}</p>
            ))} */}

            <BrokenLinks links={links} />
        </div>
    );
};

export default TextPage;
