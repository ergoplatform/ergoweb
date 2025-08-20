import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  faq?: any;
};

function processFaq(questions: any) {
  const arr = Array.isArray(questions?.data) ? [...questions.data] : [];
  arr.sort((a: any, b: any) => {
    const ao = a?.attributes?.order ?? 0;
    const bo = b?.attributes?.order ?? 0;
    return ao - bo;
  });
  return arr;
}

export default function FAQ(props: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const [md, setMd] = useState<null | {
    ReactMarkdown: any;
    remarkGfm: any;
    remarkBreaks: any;
    rehypeRaw: any;
  }>(null);
  const questions = processFaq(props.faq);

  useEffect(() => {
    let cancelled = false;
    if (open !== null && md === null) {
      Promise.all([
        import('react-markdown'),
        import('remark-gfm'),
        import('remark-breaks'),
        import('rehype-raw'),
      ]).then(([rm, gfm, brk, raw]) => {
        if (!cancelled) {
          setMd({
            ReactMarkdown: (rm as any).default || rm,
            remarkGfm: (gfm as any).default || gfm,
            remarkBreaks: (brk as any).default || brk,
            rehypeRaw: (raw as any).default || raw,
          });
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [open, md]);
  return (
    <div id="FAQ" className="max-w-[1300px] mx-auto p-4 mt-40 relative z-10">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <b>
            <p className="text-[#585858] dark:text-[#585858] pt-6">
              <FormattedMessage defaultMessage="ANY QUESTIONS?" id="components.faq.anyQuestions" />
            </p>
          </b>
          <a className="font-vinila-extended text-[48px] lg:text-[120px]">
            <FormattedMessage defaultMessage="FAQ" id="components.faq.heading" />
          </a>
          <p className="text-[#585858] dark:text-[#807e7e]">
            <FormattedMessage
              defaultMessage="We’ve compiled some of the most frequently asked questions."
              id="components.faq.description"
            />
          </p>
          <div className="mt-96 hidden lg:block">
            <p className="text-[24px] mb-6 font-bold">
              <FormattedMessage
                defaultMessage="CAN'T FIND WHAT {breakingLine} YOU’RE LOOKING FOR?"
                id={'components.faq.text.2'}
                values={{ breakingLine: <br /> }}
              />
            </p>
            <a
              href="mailto:team@ergoplatform.org"
              className="text-[24px] text-brand-orange dark:text-brand-orange"
            >
              team@ergoplatform.org
            </a>
          </div>
        </div>
        <div className="lg:w-2/3">
          <div id="faq-accordion">
            {questions.map((question: any, i: number) => (
              <div key={i}>
                <div
                  onClick={() => setOpen(open === i ? null : i)}
                  role="button"
                  aria-expanded={open === i}
                  aria-controls={'faq-collapse' + i.toString()}
                  className="w-full pt-4 cursor-pointer"
                >
                  <a
                    id={'faq-heading' + i.toString()}
                    className="font-vinila-extended text-[16px] lg:text-[24px] text-brand-orange dark:text-brand-orange"
                  >
                    <button type="button">{question.attributes.question}</button>
                  </a>
                </div>
                <div
                  id={'faq-collapse' + i.toString()}
                  className={open === i ? 'faq-open block' : 'faq-closed hidden'}
                  aria-labelledby={'faq-heading' + i.toString()}
                >
                  {open === i ? (
                    md ? (
                      <md.ReactMarkdown
                        remarkPlugins={[md.remarkGfm, md.remarkBreaks]}
                        rehypePlugins={[md.rehypeRaw]}
                        className="faq-answer"
                      >
                        {question.attributes.answer}
                      </md.ReactMarkdown>
                    ) : (
                      <div className="faq-answer">Loading...</div>
                    )
                  ) : null}
                </div>
                <div className="w-full pb-4"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 lg:hidden">
          <p className="text-[14px] mb-4 font-bold">
            <FormattedMessage
              defaultMessage="CAN'T FIND WHAT {breakingLine} YOU’RE LOOKING FOR?"
              id={'components.faq.text.2'}
              values={{ breakingLine: <br /> }}
            />
          </p>
          <a
            href="mailto:team@ergoplatform.org"
            className="text-16px] text-brand-orange dark:text-brand-orange"
          >
            team@ergoplatform.org
          </a>
        </div>
      </div>
    </div>
  );
}
