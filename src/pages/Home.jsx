import { PageWrapper } from '../layout/PageWrapper';
import { Post } from '../components/Post';

export const Home = ({ posts, website }) => {
    const showArchive = posts.length > 3;
    return <PageWrapper website={website} showArchive={showArchive}>
        {posts.map((post) => <Post post={post} website={website} />)}
    </PageWrapper>;
};

