import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import BlogNews from "../components/blog/BlogNews";
import BlogPosts from "../components/blog/BlogPosts";
import Layout from "../components/Layout";

type Props = {
  posts?: any;
  news?: any;
};

export default function Blog(props: Props) {
  const intl = useIntl();
  const { locale } = useRouter();
  const title = intl.formatMessage({
    id: "pages.blog.title",
    defaultMessage: "Blog",
  });
  return (
    <div>
      <div className="blog-frame-1"></div>
      <div className="blog-frame-2"></div>
      <div className="blog-frame-3"></div>
      <div className="blog-blur-1"></div>
      <div className="blog-blur-2"></div>
      <Layout title={title}>
        <div id="Blog" className="max-w-[1300px] mx-auto p-4 relative z-10">
          <BlogNews news={props.news} />
          <div className="text-right">
            <h1 className="mb-10">Blog</h1>
          </div>
          <BlogPosts data={props.posts} locale={locale} />
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const posts = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=21&populate=*&filters[type][$eq]=blog&locale=" +
      context.locale
  )
    .then((response) => response.json())
    .then((response) => response.data);

  const news = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=news&locale=" +
      context.locale
  )
    .then((response) => response.json())
    .then((response) => response.data);

  return {
    props: { posts, news },
  };
};
