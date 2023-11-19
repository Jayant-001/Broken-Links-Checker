"use client";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { TailSpin } from "react-loading-icons";

interface LinkType {
    url: string;
    status?: number; 
    state: string;
}

interface PropType {
    setLinks: (links: LinkType[]) => void;
    setSearched: (value: boolean) => void;
}

function validateUrl(value: string) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
    );
}

const LinkInputForm: React.FC<PropType> = ({ setLinks, setSearched }) => {
    const [url, setUrl] = useState<string>("");

    const mutation = useMutation({
        mutationFn: async () => await axios.post("/api/broken-links", { url }),
        onSuccess: (data) => {
            setSearched(true);
            setLinks(data.data?.notFoundLinks);
        },
        onError: (error: any) => {
            alert(error.message);
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!validateUrl(url)) {
            alert("URL is not valid");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="text-lg w-full sm:text-xl md:text-2xl1 bg-[#8FB4FF] flex  rounded-xl py-10 px-5">
            <input
                className="flex-1 rounded-l-xl px-3 py-2 outline-none"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
            />
            <button
                className="cursor-pointer px-5 py-1 flex justify-center items-center w-28 bg-[#FF8F94]  active:opacity-50 text-white rounded-r-xl"
                type="button"
                onClick={handleSubmit}
            >
                {mutation.isLoading ? (
                    <TailSpin className="text-sm w-7 h-fit " />
                ) : (
                    "Check"
                )}
            </button>
        </div>
    );
};

export default LinkInputForm;
