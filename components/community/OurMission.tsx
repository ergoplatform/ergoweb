import Button from '../Button';

export default function OurMission() {
  return (
    <div id="Foundation" className="max-w-[1300px] mx-auto p-4 relative z-10">
      <p className="font-vinila-extended-bold text-[40px] md:text-[80px] mb-8">Our Mission</p>
      <div className="md:mx-auto md:w-[758px]">
        <p className="mb-8 text-[#807e7e] dark:text-[#807e7e] font-bold md:text-[24px] md:max-w-3xl">
          Ergo Foundation is committed to organic and non-breaking development of Ergo Platform
          protocol.
        </p>
        <Button
          text="REACH US ON TWITTER"
          url="https://twitter.com/ergofoundation"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text="EMISSION AND TOKENOMICS"
          url="/blog/emission/"
          newTab={false}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text="THE ERGO FOUNDATION"
          url="/blog/ergo-foundation/"
          newTab={false}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <p className="text-[#807e7e] dark:text-[#807e7e] md:text-[16px] md:max-w-3xl">
          The Ergo Foundation is committed to make efforts to maximize the number of valuable
          ecosystem developments done in an open-source way with the least permissive license
          possible.
        </p>
      </div>
    </div>
  );
}
