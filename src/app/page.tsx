"use client";
import BrokenLinks from "@/components/BrokenLinks";
import LinkInputForm from "@/components/LinkInputForm";
import { useState } from "react";

interface LinkType {
    url: string;
    status?: number;
    state: string;
}

export default function Home() {
    
    const [brokenLinks, setBrokenLinks] = useState<LinkType[]>([]); // array to store dead links
    const [searched, setSearched] = useState<boolean>(false); // is user searched any url or not || used to show BrokenLinks component

    return (
        <div className="py-24 border px-10 sm:px-14 md:px-28 gap-10 min-h-screen flex flex-col items-center justify-center">
            <div>
                <h3 className="text-2xl font-bold">
                    Site Checker: Free Broken Link Tool
                </h3>
                <p className="text-sm text-red-400">
                    ** Search may take some time; In case of long wait refresh
                    the page and try again.**
                </p>
            </div>
            <LinkInputForm
                setLinks={setBrokenLinks}
                setSearched={setSearched}
            />
            {/* If user searched any URL show BrokenLinks component */}
            {searched && <BrokenLinks links={brokenLinks} />}
        </div>
    );
}
