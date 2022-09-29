import fs from 'fs';
import { Feed } from 'feed';

const removeMd = require('remove-markdown');

export default async function generateRssFeed() {
  const posts = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=blog',
  )
    .then((response) => response.json())
    .catch((err) => null);

  const news = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=news',
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => null);

  const contentPosts = [...posts.data, ...news]
    .map((item) => {
      if (item.attributes) {
        return item.attributes;
      }
      return item;
    })
    .sort((a, b) => {
      if (a.publishedAt < b.publishedAt) {
        return 1;
      }

      return -1;
    });

  const siteURL = 'https://ergoplatform.org';
  const date = new Date();
  const author = {
    name: 'Ergo',
    email: 'team@ergoplatform.org',
    link: 'https://twitter.com/ergoplatformorg',
  };

  const feed = new Feed({
    title: 'Ergo Latest blog posts and news',
    description:
      'Ergo is a next-generation smart contract platform that ensures the economic freedom of ordinary people through secure, accessible, and decentralized financial tools.',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Ergo`,
    updated: date, // today's date
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  });
  contentPosts.forEach((post) => {
    const url = `${siteURL}/en/${post.type === 'news' ? 'news' : 'blog'}/${post.permalink}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.subtitle,
      content: removeMd(post.content),
      author: [author],
      contributor: [author],
      date: new Date(post.publishedAt),
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
