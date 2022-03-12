import { Tab } from '@headlessui/react'
import { Github, PersonPlaceholder, Twitter } from '../icons';

type Props = {
    teamMembers?: any;
};

type HallOfFamePersonProps = {
    name?: string;
    bio?: string;
    github?: string;
    twitter?: string;
    image?: string
}

function HallOfFamePerson(props: HallOfFamePersonProps) {
    return (
        <div className='h-96 w-60'>
            {props.image && props.image?.length > 0 ? <img src={props.image} className="hall-of-fame-person-card object-cover h-60 w-60 grayscale" /> : <PersonPlaceholder className="hall-of-fame-person-card object-cover h-60 w-60" /> }
            {/* <div>{props.bio}</div> */}
            <div className='flex flex-row justify-between mt-5'>
                <p className='font-vinila-extended text-[16px] w-10'>{props.name}</p>
                <div className='flex flex-row'>
                    <div>{props.github && props.github?.length > 0 ? <a href={props.github} target="_blank" rel="noreferrer"><Github className='fill-brand-orange' /></a> : ''}</div>
                    <div className='ml-4'>{props.twitter && props.twitter?.length > 0 ? <a href={props.twitter} target="_blank" rel="noreferrer"><Twitter className='fill-brand-orange' /></a> : ''}</div>
                </div>
            </div>
        </div>
    )
}

function GroupPersons(data:any, group:string){
    let persons:Array<any> = []
    data.data.forEach(function (person:any) {  
        if(group == person.attributes.group) {
            persons.push(person)
        }
    });
    return(
        <div className='flex overflow-x-auto space-x-8 mt-8 no-scrollbar pb-10'>
            {persons?.map((person: any, i: number) => (
                <HallOfFamePerson key={i} name={person.attributes.name} bio={person.attributes.bio} github={person.attributes.github} twitter={person.attributes.twitter} image={person.attributes.image.data?.attributes.formats.thumbnail.url} />
            ))}
        </div>
    )
}

export default function HallOfFame(props: Props) {
    return (
        <div className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4">
            <h2><b>Hall Of Fame</b></h2>
            <p className="text-[#989898] dark:text-[#989898] mt-10">The Ergo Team has a solid background in core development with cryptocurrencies and blockchain frameworks including NXT, Scorex, CARDANO and WAVES. Explore our key research. Below are brief biographies for some of the core ERGO team but there are many other developers and community members involved, some of whom are anonymous.</p>
            <div>
                <Tab.Group>
                    <Tab.List className='flex justify-around mt-16'>
                        <Tab
                            className={({ selected }) => selected ? 'font-subtitle-3-uppercase text-brand-orange dark:text-brand-orange underline underline-offset-4' : 'font-subtitle-3-uppercase'}>
                            ERGO FOUNDATION
                        </Tab>
                        <Tab
                            className={({ selected }) => selected ? 'font-subtitle-3-uppercase text-brand-orange dark:text-brand-orange underline underline-offset-4' : 'font-subtitle-3-uppercase'}>
                            ERGO FOUNDATION ADVISORS
                        </Tab>
                        <Tab
                            className={({ selected }) => selected ? 'font-subtitle-3-uppercase text-brand-orange dark:text-brand-orange underline underline-offset-4' : 'font-subtitle-3-uppercase'}>
                            ECOSYSTEM CORE
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className='mt-16'>
                        <Tab.Panel>{GroupPersons(props.teamMembers, 'ergo_foundation')}</Tab.Panel>
                        <Tab.Panel>{GroupPersons(props.teamMembers, 'ergo_foundation_advisors')}</Tab.Panel>
                        <Tab.Panel>{GroupPersons(props.teamMembers, 'ecosystem_core')}</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}