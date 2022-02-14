import type { NextPage } from 'next'
import { FormattedMessage } from 'react-intl'
import Layout from '../../components/Layout'

const Post: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold dark:underline">
        <FormattedMessage defaultMessage="Post" id="pages.post.hero" />
      </h1>
    </Layout>
  )
}

export default Post;