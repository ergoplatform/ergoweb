type Props = {
  projects?: any;
};

function adjustCardPosition(i:number){
  switch(i){
    case 0:
      return " lg:row-span-2"
      break;
    case 1:
      return " lg:col-span-2 lg:flex-row"
      break;
    default:
      return ""
      break;
  }
}

function adjustCardText(i:number){
  switch(i){
    case 0:
      return " h-1/2 lg:h-1/3"
      break;
    case 1:
      return " h-1/2 lg:ml-8"
      break;
    case 2:
      return " h-1/2"
      break;
    case 3:
      return " h-1/2"
      break;
    default:
      return ""
      break;
  }
}

function adjustCardPhoto(i:number){
  switch(i){
    case 0:
      return " h-1/2 lg:h-2/3"
      break;
    case 1:
      return " h-1/2"
      break;
    case 2:
      return " h-1/2"
      break;
    case 3:
      return " h-1/2"
      break;
    default:
      return ""
      break;
  }
}

export default function FeaturesAndProjects(props: Props) {
  return (
    <div className="max-w-[1300px] mx-auto p-4 relative">
      <p className="text-[#585858] dark:text-[#585858] font-bold mb-8">
        NEW FEATURES AND PROJECTS YOU MIGHT LIKE
      </p>
      <div className="flex overflow-x-auto no-scrollbar gap-5 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:max-h-[860px]">
        {props.projects.data.map((project: any, i: number) => (
          <div key={i} className={"rounded-3xl features-and-projects-bg flex flex-col min-w-[282px] p-4" + adjustCardPosition(i)} >
            <img
              className={"object-contain items-center lg:my-auto" + adjustCardPhoto(i)}
              src={project.attributes.image.data?.attributes.url}
            />
            <div className={"flex flex-col lg:my-auto" + adjustCardText(i)}>
              <p className="mt-4 text-[#585858] dark:text-[#585858] lg:text-[20px] font-bold h-1/5">
                {project.attributes.group}
              </p>
              <p className="mt-2 font-subtitle-3-bold lg:text-[24px] h-2/5">
                {project.attributes.title}
              </p>
              <p className="mt-2 text-[#989898] dark:text-[#989898] lg:text-[16px] h-2/5">
                {project.attributes.description}
              </p>
              <div className="my-2 h-1/5">
                <a
                  className="underline text-brand-orange dark:text-brand-orange font-vinila-extended lg:text-[16px]"
                  href={project.attributes.url}
                  target="_blank"
                >
                  {project.attributes.button_text}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex overflow-x-auto no-scrollbar pb-10 lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 max-h-[860px]">
        <div className="px-6 py-10 rounded-3xl box lg:row-span-2 features-and-projects-bg flex lg:flex-col justify-around">
          <div>
            <img
              className="object-fit max-h-[500px] items-center"
              src={props.projects.data[0].attributes.image.data?.attributes.url}
            />
          </div>
          <div>
            <p className="mt-4 text-[#585858] dark:text-[#585858] lg:text-[20px] font-bold">
              {props.projects.data[0].attributes.group}
            </p>
            <p className="mt-2 font-subtitle-3-bold lg:text-[24px]">
              {props.projects.data[0].attributes.title}
            </p>
            <p className="mt-2 text-[#989898] dark:text-[#989898] lg:text-[16px]">
              {props.projects.data[0].attributes.description}
            </p>
            <div className="my-2">
              <a
                className="underline text-brand-orange dark:text-brand-orange font-vinila-extended lg:text-[16px]"
                href={props.projects.data[0].attributes.url}
                target="_blank"
              >
                {props.projects.data[0].attributes.button_text}
              </a>
            </div>
          </div>
        </div>
        <div className="p-10 rounded-3xl box lg:col-span-2 features-and-projects-bg flex flex-row ">
          <div className="my-auto w-1/2">
            <img
              className="object-fit items-center max-h-[300px]"
              src={props.projects.data[1].attributes.image.data?.attributes.url}
            />
          </div>
          <div className="my-auto ml-6  w-1/2">
            <p className="mt-4 text-[#585858] dark:text-[#585858] lg:text-[20px] font-bold">
              {props.projects.data[1].attributes.group}
            </p>
            <p className="mt-2 font-subtitle-3-bold lg:text-[24px]">
              {props.projects.data[1].attributes.title}
            </p>
            <p className="mt-2 text-[#989898] dark:text-[#989898] lg:text-[16px]">
              {props.projects.data[1].attributes.description}
            </p>
            <div className="my-2">
              <a
                className="underline text-brand-orange dark:text-brand-orange font-vinila-extended lg:text-[16px]"
                href={props.projects.data[1].attributes.url}
                target="_blank"
              >
                {props.projects.data[1].attributes.button_text}
              </a>
            </div>
          </div>
        </div>
        <div className="p-10 rounded-3xl box features-and-projects-bg flex lg:flex-col justify-around">
          <div>
            <img
              className="object-fit items-center max-h-[200px]"
              src={props.projects.data[2].attributes.image.data?.attributes.url}
            />
          </div>
          <div>
            <p className="mt-4 text-[#585858] dark:text-[#585858] lg:text-[20px] font-bold">
              {props.projects.data[2].attributes.group}
            </p>
            <p className="mt-2 font-subtitle-3-bold lg:text-[24px]">
              {props.projects.data[2].attributes.title}
            </p>
            <p className="mt-2 text-[#989898] dark:text-[#989898] lg:text-[16px]">
              {props.projects.data[2].attributes.description}
            </p>
            <div className="my-2">
              <a
                className="underline text-brand-orange dark:text-brand-orange font-vinila-extended lg:text-[16px]"
                href={props.projects.data[2].attributes.url}
                target="_blank"
              >
                {props.projects.data[2].attributes.button_text}
              </a>
            </div>
          </div>
        </div>
        <div className="p-10 rounded-3xl box features-and-projects-bg flex lg:flex-col justify-around">
          <div>
            <img
              className="object-fit items-center max-h-[200px]"
              src={props.projects.data[3].attributes.image.data?.attributes.url}
            />
          </div>
          <div>
            <p className="mt-4 text-[#585858] dark:text-[#585858] lg:text-[20px] font-bold">
              {props.projects.data[3].attributes.group}
            </p>
            <p className="mt-2 font-subtitle-3-bold lg:text-[24px]">
              {props.projects.data[3].attributes.title}
            </p>
            <p className="mt-2 text-[#989898] dark:text-[#989898] lg:text-[16px]">
              {props.projects.data[3].attributes.description}
            </p>
            <div className="my-2">
              <a
                className="underline text-brand-orange dark:text-brand-orange font-vinila-extended lg:text-[16px]"
                href={props.projects.data[3].attributes.url}
                target="_blank"
              >
                {props.projects.data[3].attributes.button_text}
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
