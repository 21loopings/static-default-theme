import { PageWrapper } from '../layout/PageWrapper';
import { PostComponent } from '../components/PostComponent';

export const PostPage = ({ post, website }) => {
    return <PageWrapper website={website}>
        <PostComponent post={post} website={website} />
    </PageWrapper>;
};
