import { useIntl } from 'react-intl';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';

const DynamicHallOfFame = dynamic(() => import('../components/community/HallOfFame'), {
  ssr: false,
});

type Props = {
  teamMembers?: any;
};

export default function HallOfFamePage(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: 'hallOfFame.title',
    defaultMessage: 'Hall of Fame',
  });

  return (
    <div className="relative overflow-hidden">
      <Layout title={title}>
        <div className="pt-20">
          {props.teamMembers ? (
            <DynamicHallOfFame teamMembers={props.teamMembers} />
          ) : null}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Map app locale -> Strapi locale (cn -> zh)
  const toStrapiLocale = (l: string) => (l === 'cn' ? 'zh' : l);

  const appLocale = context.locale as string;
  const mapped = toStrapiLocale(appLocale);

  // Team members localized to current locale
  const teamMembers = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/team-members?pagination[pageSize]=100&populate=*&locale=' +
      encodeURIComponent(mapped),
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch(() => null);

  return {
    props: { teamMembers },
  };
};