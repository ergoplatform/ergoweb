import { useIntl } from "react-intl";
import Layout from "../components/Layout";
import Post from "../components/shared/Post";

type Props = {
  posts?: any;
};

export default function News(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.news.title",
    defaultMessage: "News",
  });
  return (
    <div>
      <Layout title={title}>
        <div id="News" className="max-w-[1300px] mx-auto p-4 relative z-10">
          <h1 className="mb-10">News</h1>
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
      "/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=news&locale=" +
      context.locale
  )
    .then((response) => response.json())
    .then((response) => response.data);

  return {
    props: { posts },
  };
};
