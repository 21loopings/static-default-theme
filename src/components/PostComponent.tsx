import { Gallery } from './Gallery';
import { Divider } from './Divider';
import { getPostBasePath } from '../utils/paths';
import { formatMarkdown } from '../utils/markdown';
import fm from 'front-matter';

const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        weekday: "long", year: "numeric", month: "short", day: "numeric"
    });
};

export const PostComponent = ({ post, website }) => {
    const postLink = getPostBasePath({ post, website });
    const { attributes, body: content } = fm(post.content);
    const title = post.title ?? (attributes as any).title;
    const html = formatMarkdown({ content, post, website });
    return <article>
        <header>
            <a href={postLink}>
                {formatDate(post.publishedAt)}
                {post.title && <h2>{title}</h2>}
            </a>
        </header>
        <div class="content">
            <div dangerouslySetInnerHTML={{
                __html: html
            }} />
            {(post.photos.length > 0) && <Gallery post={post} website={website} />}
        </div>
        {post.photos.length == 0 && <Divider />}
    </article>;
}
