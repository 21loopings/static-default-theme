import { PageWrapper } from '../layout/PageWrapper';
import { Post } from '../components/Post';

export const PostPage = ({ post, website }) => {
    return <PageWrapper website={website}>
        <Post post={post} website={website} />
    </PageWrapper>;
};
