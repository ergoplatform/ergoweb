import { useIntl } from "react-intl";
import BlogNews from "../components/blog/BlogNews";
import Layout from "../components/Layout";
import Post from "../components/shared/Post";

type Props = {
  posts?: any;
  news?: any;
};

export default function Blog(props: Props) {
  const intl = useIntl();
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
            <h1 className="mb-10" >Blog</h1>
          </div>
          <div className="grid grid-cols-1 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
            {props.posts.map((post: any) => (
              <div key={post.id} className="mx-auto">
                {
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.attributes.title}
                    subtitle={post.attributes.subtitle}
                    tags={post.attributes.tag}
                    date={post.attributes.date}
                    url={post.attributes.url}
                    type={post.attributes.type}
                    content={post.attributes.content}
                    image={
                      post.attributes.image.data != null
                        ? post.attributes.image.data.attributes.formats.medium
                            .url
                        : null
                    }
                  />
                }
              </div>
            ))}
          </div>
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
