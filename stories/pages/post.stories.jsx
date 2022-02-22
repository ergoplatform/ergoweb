import Post, { getServerSideProps } from "../../pages/posts/[id]";

export default {
  title: "Pages/Post",
  component: Post,
};

export const PostPage = (args, { loaded: { post }}) => <Post {...args} post={post} />

PostPage.story = {
  parameters: {
    nextRouter: {
      path: "/posts/[id]",
      asPath: "/posts/184",
      query: {
        id: "184",
      },
    },
  },
};

PostPage.loaders = [
  async () => {
    let data = await getServerSideProps({query:{id:184}});
    return data.props;
  }
]