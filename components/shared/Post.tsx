import Link from "next/link";
import { FormattedDate } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";
import { Logo, LogoBlack } from "../icons";
const removeMd = require('remove-markdown');

type Props = {
    id: number;
    title: string;
    subtitle?: string;
    author?: string;
    date?: string;
    image?: string;
    tags?: string;
    url?: string;
    type?: string;
    content?: string;
};

export default function Post({
    id,
    title,
    subtitle,
    author = "Ergo Platform",
    date,
    image,
    tags,
    url,
    type,
    content
}: Props) {
    return (
        <div className="w-96 flex-shrink-0 shadow-xl rounded-2xl">
            <div className="flex-shrink-0 relative">
                {image == null ? <div className="h-48 bg-gray-200 w-full object-cover rounded-t-2xl"></div> : <img className="h-48 w-full object-cover rounded-t-2xl" src={image} alt="" />}
                <div className="absolute left-4 top-4">
                    {/* <b className="items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-brand-black text-white uppercase z-10">
                        {type}
                    </b> */}
                    {tags?.split(',').map((item, i) => (
                        <b className="items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-brand-black text-white uppercase z-10">
                            {item.trim()}
                        </b>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-6 h-60 flex flex-col justify-between rounded-b-2xl bg-white">
                <div className="flex-1">
                    <a href={type == 'news' ? url : '/blog/' + id} target="_blank" className="block mt-2">
                        <p className="font-roboto text-[20px] dark:text-black">{title}</p>
                        <p className="font-roboto text-[14px] text-[#585858] dark:text-[#585858] mt-2">{type == 'news' ? subtitle : removeMd(content)?.split(' ').splice(0,20).join(' ') + '...'}</p>
                    </a>
                </div>
                <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                        <LogoBlack viewBox="0 0 82 82" className="h-10 w-10" />
                    </div>
                    <div className="ml-3">
                        <b className="text-[14px] text-brand-orange dark:text-brand-orange">{author}</b>
                        <div className="flex space-x-1"><p className="text-[#000000] dark:text-[#000000]"><FormattedDate value={date} day="numeric" month="long" year="numeric" /></p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}