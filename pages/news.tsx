import { useIntl } from 'react-intl';
import BlogNews from '../components/blog/BlogNews';
import Layout from '../components/Layout';
import { strapiFetchJson } from '../utils/strapiClient';

type Props = {
  news?: any;
  media?: any;
};

export default function News(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: 'pages.news.title',
    defaultMessage: 'News',
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
          {props.news ? <BlogNews news={props.news} /> : null}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const newsJson = await strapiFetchJson<{ data?: any[] }>(
    `/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=news&locale=${context.locale}`,
  );
  const mediaJson = await strapiFetchJson<{ data?: any[] }>(
    '/api/media-posts?pagination[pageSize]=20',
  );
  const news = newsJson?.data ?? null;
  const media = mediaJson?.data ?? null;

  return {
    props: { news, media },
  };
};
