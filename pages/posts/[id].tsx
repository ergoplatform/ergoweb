import { FormattedDate } from 'react-intl'
import Layout from '../../components/Layout'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'

type Props = {
  post?: any;
};

export default function Post(props: Props) {
  return (
    <Layout title={props.post.data.attributes.title}>
      <div className="post max-w-7xl mx-auto p-4 mb-20">
        <div className='px-14'>
          <h4>{props.post.data.attributes.title}</h4>
          <div className='mb-8 mt-4'>
            {props.post.data.attributes.tag?.split(',').map((item:string, i:number) => (
              <b key={item.trim()} className="items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-brand-black dark:bg-white text-white dark:text-black uppercase z-10">
                {item.trim()}
              </b>
            ))}
          </div>
          <p className='mb-20'>by {props.post.data.attributes.author} - <i><FormattedDate value={props.post.data.attributes.date} day="numeric" month="long" year="numeric" /></i></p>
          <ReactMarkdown  remarkPlugins={[remarkGfm,remarkBreaks]} rehypePlugins={[rehypeRaw]} >{props.post.data.attributes.content}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const post = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API + "/api/posts/" + context.query.id
  ).then((response) => response.json());
  return {
    props: { post }
  };
};