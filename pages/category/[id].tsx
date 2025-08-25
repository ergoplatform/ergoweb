import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BlogPosts from '../../components/blog/BlogPosts';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import Pagination from '../../components/shared/Pagination';

type Props = {
  posts?: any;
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
};

export default function Category(props: Props) {
  const intl = useIntl();
  const { locale, query } = useRouter();
  const currentPage = Number((query.page as string) || 1);
  const title = intl.formatMessage({
    id: 'pages.blog.title',
    defaultMessage: 'Blog',
  });
  return (
    <div>
      <div className="blog-frame-1"></div>
      <div className="blog-frame-2"></div>
      <div className="blog-frame-3"></div>
      <div className="blog-blur-1"></div>
      <Layout title={title}>
        <div id="Blog" className="max-w-[1300px] mx-auto p-4 relative z-10 min-h-[1800px]">
          <div className="flex flex-row justify-between my-10 mx-4 md:mx-32">
            <div>
              <div className="-ml-4">
                <Button
                  text="BACK TO ALL POSTS"
                  url="/blog"
                  newTab={false}
                  underline={true}
                  textColor="brand-orange"
                  background={false}
                />
              </div>
              <p className="font-vinila-extended text-[40px] md:text-[48px] bg-black/50 text-white px-3 py-2 rounded-md inline-block">
                Search by tag “{query.id}”
              </p>
            </div>
          </div>
          <BlogPosts data={props.posts} locale={locale} />
          <Pagination
            currentPage={currentPage}
            total={props.pagination?.total ?? 0}
            pageSize={props.pagination?.pageSize ?? 12}
            basePath={`/category/${query.id}`}
          />
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const page = Number(context.query.page || 1);
  const pageSize = 12;

  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      `/api/posts?sort=date:desc&pagination[withCount]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&filters[$or][0][type][$eq]=blog&filters[$or][1][type][$eq]=news&filters[tag][$contains]=${context.query.id}&locale=${context.locale}`,
  )
    .then((response) => response.json())
    .catch(() => null);

  const posts = res?.data ?? null;
  const pagination = res?.meta?.pagination ?? null;

  return {
    props: { posts, pagination },
  };
};
