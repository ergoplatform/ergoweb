import Post from "./Post";

type Props = {
    posts?: any;
};

export default function Feed(props: Props) {
    return (
        <>
        {/* <div>
            <div className="card-bg">Hi</div>
            <div>
                <h1 className="-mb-14">News</h1>
                <h1>&Blog</h1>
            </div>
        </div> */}

        <div className="flex overflow-x-auto space-x-8 mt-8 no-scrollbar pb-8">
            <div className="hidden md:block md:w-20 flex-shrink-0"></div>
            {props.posts.data?.map((post: any, i: number) => (
                <Post key={post.id} id={post.id} title={post.attributes.title} subtitle={post.attributes.subtitle} tags={post.attributes.tags} date={post.attributes.date} url={post.attributes.url} type={post.attributes.type} content={post.attributes.content} image={post.attributes.image.data != null ? post.attributes.image.data.attributes.formats.medium.url : null } />
            ))}
        </div>
        </>
    );
}
