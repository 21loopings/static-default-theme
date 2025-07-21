import { PageWrapper } from '../layout/PageWrapper';
import { PostComponent } from '../components/PostComponent';
import { Post, Website } from '@/types';

export const Home = ({ posts, website }: { posts: Post[], website: Website }) => {
    const showArchive = posts.length > 3;
    return <PageWrapper website={website} showArchive={showArchive}>
        {posts.map((post) => <PostComponent post={post} website={website} />)}
    </PageWrapper>;
};

