import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Github, PersonPlaceholder, Twitter } from "../icons";

type Props = {
  teamMembers?: any;
};

type HallOfFamePersonProps = {
  name?: string;
  bio?: string;
  github?: string;
  twitter?: string;
  image?: any;
};

function HallOfFamePerson(props: HallOfFamePersonProps) {
  return (
    <div className="h-[400px] w-56 lg:w-80 mx-auto">
      <div className="flip">
        <div className="flip-content h-56 w-56 lg:w-80 lg:h-80">
          <div className="flip-front object-cover w-full h-full ">

            {props.image?.attributes.formats.thumbnail.url != null && props.image?.attributes.formats.thumbnail.url.length > 0 ? (
              <Image
                layout='fill'
                src={props.image?.attributes.formats.thumbnail.url}
                className="hall-of-fame-person-card object-cover w-full h-full grayscale"
              />
            ) : (
              <PersonPlaceholder className="hall-of-fame-person-card object-cover w-full h-full" />
            )}
          </div>
          <div className="flip-back hall-of-fame-person-card h-56 w-56 lg:w-80 lg:h-80 flex flex-col-reverse">
            <div className="my-auto px-2">
              <p className="text-center text-xs align-middle text-white">
                {props.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-5 lg:min-h-[72px]">
        <p className="font-vinila-extended text-[16px] lg:text-[24px] pr-2 lg:my-auto">
          {props.name}
        </p>
        <div className="flex flex-row">
          <div className="my-auto">
            {props.github && props.github?.length > 0 ? (
              <a href={props.twitter} target="_blank" rel="noreferrer">
                <Twitter className="fill-brand-orange scale-50 lg:scale-100" />
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="my-auto">
            {props.twitter && props.twitter?.length > 0 ? (
              <a href={props.github} target="_blank" rel="noreferrer">
                <Github className="fill-brand-orange scale-50 lg:scale-100" />
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupPersons(data: any, group: string) {
  let persons: Array<any> = [];
  data.data.forEach(function (person: any) {
    if (group == person.attributes.group) {
      persons.push(person);
    }
  });
  return (
    <div className="flex overflow-x-auto space-x-8 mt-8 no-scrollbar pb-10 lg:grid lg:grid-cols-3 lg:justify-around lg:space-x-0 lg:gap-y-20 lg:gap-x-8">
      {persons?.map((person: any, i: number) => (
        <div key={i}>
          <HallOfFamePerson
            key={i}
            name={person.attributes.name}
            bio={person.attributes.bio}
            github={person.attributes.github}
            twitter={person.attributes.twitter}
            image={
              person.attributes.image.data
            }
          />
        </div>
      ))}
    </div>
  );
}

export default function HallOfFame(props: Props) {
  return (
    <div className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative z-10">
      <h2>
        <b>Hall Of Fame</b>
      </h2>
      <p className="text-[#989898] dark:text-[#989898] mt-10">
        The Ergo Team has a solid background in core development with
        cryptocurrencies and blockchain frameworks including NXT, Scorex,
        CARDANO and WAVES. Explore our key research. Below are brief biographies
        for some of the core ERGO team but there are many other developers and
        community members involved, some of whom are anonymous.
      </p>
      <div>
        <Tab.Group>
          <Tab.List className="flex justify-around mt-16">
            <Tab
              className={({ selected }) =>
                selected
                  ? "font-subtitle-3-uppercase text-brand-orange dark:text-brand-orange underline underline-offset-4"
                  : "font-subtitle-3-uppercase"
              }
            >
              CORE
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "font-subtitle-3-uppercase text-brand-orange dark:text-brand-orange underline underline-offset-4"
                  : "font-subtitle-3-uppercase"
              }
            >
              COMMUNITY
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "font-subtitle-3-uppercase text-brand-orange dark:text-brand-orange underline underline-offset-4"
                  : "font-subtitle-3-uppercase"
              }
            >
              FOUNDATION
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-16">
            <Tab.Panel>
              {GroupPersons(props.teamMembers, "ecosystem_core")}
            </Tab.Panel>
            <Tab.Panel>
              {GroupPersons(props.teamMembers, "community")}
            </Tab.Panel>
            <Tab.Panel>
              {GroupPersons(props.teamMembers, "ergo_foundation")}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
