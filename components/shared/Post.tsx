import Image from "next/image";
import Link from "next/link";
import { FormattedDate } from "react-intl";
import { LogoBlack } from "../icons";
const removeMd = require("remove-markdown");

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
  content,
}: Props) {
  return (
    <div className="w-96 flex-shrink-0 shadow-xl rounded-2xl relative z-10">
      <div className="flex-shrink-0 relative">
        <a
          href={type == "news" ? url : "/posts/" + id}
          target="_blank"
          rel="noreferrer"
          className="block mt-2"
        >
          {image == null ? (
            <div className="h-48 bg-gray-200 w-full object-cover rounded-t-2xl"></div>
          ) : (
            <div className="-mb-2">
              <Image
                className="h-48 w-full object-cover rounded-t-2xl"
                src={image}
                alt=""
                height="186px"
                width="384px"
              />
            </div>
          )}
          <div className="absolute left-4 top-4">
            {tags?.split(",").map((item) => (
              <Link href={`/category/${item.trim()}`} key={item.trim()}>
                <b
                  key={item.trim()}
                  className="items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-brand-black text-white uppercase z-10"
                >
                  {item.trim()}
                </b>
              </Link>
            ))}
          </div>
        </a>
      </div>
      <div className="flex-1 p-6 h-72 flex flex-col justify-between rounded-b-2xl bg-white">
        <div className="flex-1 text-clip overflow-hidden">
          <a
            href={type == "news" ? url : "/posts/" + id}
            target="_blank"
            rel="noreferrer"
            className="block mt-2"
          >
            <p className="font-roboto text-[20px] dark:text-black h-14">
              {title}
            </p>
            <p className="font-roboto text-[14px] text-[#585858] dark:text-[#585858] mt-2">
              {type == "news" ? subtitle : removeMd(content) + "..."}
            </p>
          </a>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            <LogoBlack viewBox="0 0 82 82" className="h-10 w-10" />
          </div>
          <div className="ml-3">
            <b className="text-[14px] text-brand-orange dark:text-brand-orange">
              {author}
            </b>
            <div className="flex space-x-1">
              <p className="text-[#000000] dark:text-[#000000]">
                <FormattedDate
                  value={date}
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
