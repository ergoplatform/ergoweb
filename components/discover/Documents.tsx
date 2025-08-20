import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  documents?: any;
};

function processDocs(documents: any) {
  const items = Array.isArray(documents?.data) ? [...documents.data] : [];

  // Sort by title
  items.sort((a: any, b: any) => {
    const at = a?.attributes?.title ?? '';
    const bt = b?.attributes?.title ?? '';
    return String(at).localeCompare(String(bt));
  });

  // Group by attributes.group
  const groupsMap: Record<string, any[]> = items.reduce((acc: Record<string, any[]>, doc: any) => {
    const section = doc?.attributes?.group ?? 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(doc);
    return acc;
  }, {});

  // Build sections and sort by section name
  const sections = Object.entries(groupsMap)
    .map(([section, docs]) => ({
      name: section,
      documents: docs.map((doc: any) => {
        const a = doc?.attributes ?? {};
        return {
          title: a.title,
          download: a.url == null,
          url: a.url ?? a.file?.data?.attributes?.url,
        };
      }),
    }))
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));

  return sections;
}

export default function Documents(props: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const processedDocs = processDocs(props.documents);
  return (
    <div id="Documents" className="max-w-[1300px] mx-auto p-4 mt-40 relative z-10">
      <div className="flex flex-col lg:flex-row mb-12">
        <a className="font-vinila-extended  text-[32px] sm:text-[48px] md:text-[96px] lg:w-2/3">
          <b>
            <FormattedMessage defaultMessage="Documents" id="components.documents.heading" />
          </b>
        </a>
        <div className="lg:w-1/3">
          <p className="text-[#807e7e] dark:text-[#807e7e]">
            <FormattedMessage
              defaultMessage="Ergo takes a research-based approach and uses stable well-tested solutions to provide a robust platform for developers to build on for years to come. Most of Ergo solutions are formalized in papers presented at peer-reviewed conferences and have been widely discussed in the community."
              id="components.documents.description"
            />
          </p>
        </div>
      </div>

      <div id="docs-accordion">
        {processedDocs.map((section: any, i: number) => (
          <div key={i} className="border-b-[1px]">
            <div
              onClick={() => setOpen(open === i ? null : i)}
              role="button"
              aria-expanded={open === i}
              aria-controls={'docs-collapse' + i.toString()}
              className="w-full pt-8 cursor-pointer"
            >
              <a
                id={'docs-heading' + i.toString()}
                className="font-vinila-extended text-[24px] md:text-[32px]"
              >
                <button type="button">{section.name}</button>
              </a>
            </div>
            <div
              id={'docs-collapse' + i.toString()}
              className={open === i ? 'block' : 'hidden'}
              aria-labelledby={'docs-heading' + i.toString()}
            >
              {section.documents.map((doc: any) => (
                <div className="my-4" key={doc.title}>
                  <a
                    className="font-vinila-extended text-[14px] md:text-[16px] text-brand-orange dark:text-brand-orange underline"
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {doc.title}
                  </a>
                </div>
              ))}
            </div>
            <div className="w-full pb-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
