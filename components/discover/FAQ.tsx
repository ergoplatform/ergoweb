import * as _ from "lodash";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  faq?: any;
};

function processFaq(questions: any) {
  let result: any;
  result = _.sortBy(questions.data, ['attributes.order']);
  return result
}

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

export default function FAQ(props: Props) {
  useEffect(() => { require('tw-elements'); }, []);
  const questions = processFaq(props.faq)
  return (
    <div className="max-w-[1300px] mx-auto p-4 mt-40">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <b><p className="text-[#585858] dark:text-[#585858] pt-6">ANY QUESTIONS?</p></b>
          <a className="font-vinila-extended text-[48px] lg:text-[120px]">FAQ</a>
          <p className="text-[#585858] dark:text-[#989898]">We’ve compiled some of the most frequently asked questions to clarify any doubts</p>
          <div className="mt-96 hidden lg:block">
            <p className="text-[24px] mb-6 font-bold"><FormattedMessage defaultMessage="DID’T FIND WHAT {breakingLine} YOU’RE LOOKING FOR?" id={"components.faq.text.2"} values={{ breakingLine: <br /> }} /></p>
            <a href="mailto:team@ergoplatform.org" className="text-[24px] text-brand-orange dark:text-brand-orange">team@ergoplatform.org</a>
          </div>
        </div>
        <div className="lg:w-2/3">
          <div id="faq-accordion">
            {questions.map((question: any, i: number) => (
              <div key={i}>
                <div data-bs-toggle="collapse" data-bs-target={"#faq-collapse" + i.toString()} aria-expanded={i == 0 ? "true" : "false"} aria-controls={"faq-collapse" + i.toString()} className="w-full pt-4"><a id={"faq-heading" + i.toString()} className="font-vinila-extended text-[16px] lg:text-[24px] text-brand-orange dark:text-brand-orange"><button type="button" >{question.attributes.question}</button></a></div>
                <div id={"faq-collapse" + i.toString()} className={i == 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"faq-heading" + i.toString()} data-bs-parent="#faq-accordion">
                  <p className="text-[#585858] dark:text-[#989898] mt-10"><FormattedMessageFixed defaultMessage={question.attributes.answer} id={"components.faq.questions." + i.toString() + ".text"} values={{ breakingLine: <br /> }} /></p>
                </div>
                <div data-bs-toggle="collapse" data-bs-target={"#faq-collapse" + i.toString()} aria-expanded={i == 0 ? "true" : "false"} aria-controls={"faq-collapse" + i.toString()} className="w-full pb-4"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 lg:hidden">
            <p className="text-[14px] mb-4 font-bold"><FormattedMessage defaultMessage="DID’T FIND WHAT {breakingLine} YOU’RE LOOKING FOR?" id={"components.faq.text.2"} values={{ breakingLine: <br /> }} /></p>
            <a href="mailto:team@ergoplatform.org" className="text-16px] text-brand-orange dark:text-brand-orange">team@ergoplatform.org</a>
          </div>
      </div>
    </div>
  );
}
