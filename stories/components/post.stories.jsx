
import Post from "../../components/shared/Post"
import Dark from "../../components/shared/Dark";

export default {
  title: 'Components/Post',
  component: Post,
  decorators: [
    (Story) => (
      <Dark>
        <Story />
      </Dark>
    )
  ]
};

const Template = (args) => <Post {...args} />;

export const Post = Template.bind({});
Post.args = {
  title: 'Testnet 2.2.0 released',
  subtitle: 'Sigma-State language updated, new API methods',
  author: '',
  date: '2019-06-27T00:00:00.000Z',
  image: '',
  tags: '',
  url: 'https://github.com/ergoplatform/ergo/releases/tag/v2.2.0'
};
