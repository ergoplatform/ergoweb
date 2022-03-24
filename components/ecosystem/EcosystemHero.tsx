import Image from "next/image";

export default function EcosystemHero() {
  return (
    <div className="max-w-[1300px] mx-auto p-4 relative">
      <h1 className="absolute z-10">
        <b>Ecosystem</b>
      </h1>
      <div className=" justify-around -mt-10 hidden dark:flex ecosystem-hero-gradient">
        <Image src={"/assets/ecosystem.png"} width="1100px" height="1100px" />
      </div>
      <div className="flex justify-around -mt-10 dark:hidden">
        <Image src={"/assets/ecosystem-light.png"} width="1100px" height="1100px" />
      </div>
    </div>
  );
}
