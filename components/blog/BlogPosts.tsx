import React from 'react';
import Post from '../shared/Post';

type Props = {
  data: any;
  locale?: string;
  filter?: string;
};

const BlogPosts = (props: Props) => {
  return (
    <div className="mt-10">
      {props.data ? (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-10 md:gap-y-20 md:grid-cols-2 xl:grid-cols-3">
            {props.data.map((post: any) => (
              <div key={post.id} className="w-full">
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.attributes.title}
                  subtitle={post.attributes.subtitle}
                  author={post.attributes.author}
                  tags={post.attributes.tag}
                  date={post.attributes.date}
                  url={post.attributes.url}
                  permalink={post.attributes.permalink}
                  type={post.attributes.type}
                  content={post.attributes.content}
                  image={
                    post.attributes.image.data != null
                      ? post.attributes.image.data?.attributes?.formats?.medium?.url
                      : null
                  }
                  blogPhoto={post.attributes.blogPhoto}
                  authorPhoto={post.attributes.authorPhoto}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BlogPosts;
