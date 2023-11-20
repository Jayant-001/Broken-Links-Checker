import React from "react";

interface LinkType {
    url: string;
    status?: number;
    state: string;
}

interface PropType {
    links: LinkType[];
}

const BrokenLinks: React.FC<PropType> = ({ links }) => {
    // show links array in tabular format
    return (
        <div className="w-full">
            <h1 className="text-center text-2xl">Dead Links</h1>
            <table cellPadding={3} className="w-full">
                <tr>
                    <th>Status</th>
                    <th>URL</th>
                </tr>
                {links.map((link, id) => {
                    return (
                        <tr key={id}>
                            <td className="text-center">{link.status}</td>
                            <td>{link.url}</td>
                        </tr>
                    );
                })}
            </table>
            {links.length === 0 && <p>There is no 404 links on this page.</p>}
        </div>
    );
};

export default BrokenLinks;
