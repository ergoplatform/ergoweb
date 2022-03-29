import Button from "../Button";

export default function OurMission() {
  return (
    <div className="max-w-[1300px] mx-auto p-4 relative z-10">
      <p className="font-vinila-extended-bold text-[40px] md:text-[80px] mb-8">
        Our Mission
      </p>
      <div className="md:mx-auto md:w-[758px]">
        <p className="mb-8 text-[#989898] dark:text-[#989898] font-bold md:text-[24px] md:max-w-3xl">
          Ergo Foundation is committed to organic and non-breaking development of
          Ergo Platform protocol.
        </p>
        <Button
          text="ACCESS OUR DOCUMENTATION"
          url="https://www.google.com"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <p className="text-[#989898] dark:text-[#989898] md:text-[16px] md:max-w-3xl">
          The Ergo Foundation is committed to make efforts to maximize the number
          of valuable ecosystem developments done in an open-source way with least
          permissive license possible.
        </p>
      </div>
    </div>
  );
}
