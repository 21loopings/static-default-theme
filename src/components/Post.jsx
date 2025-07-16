import { Gallery } from './Gallery';
import { Divider } from '../components/Divider';
import { getPostBasePath } from '../utils/paths';
import { formatMarkdown } from '../utils/markdown';
import fm from 'front-matter';

const formatDate = (timestamp) => {
    const format = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, format);
};

export const Post = ({ post, website }) => {
    const postLink = getPostBasePath({ post, website });
    const { attributes, body: content } = fm(post.content);
    const title = post.title ?? attributes.title;

    return <article>
        <header>
            <a href={postLink}>
                {formatDate(post.publishedAt)}
                {post.title && <h2>{title}</h2>}
            </a>
        </header>
        <div class="content">
            {formatMarkdown({ content, post, website })}
            {(post.photos.length > 0) && <Gallery post={post} website={website} />}
        </div>
        {post.photos.length == 0 && <Divider />}
    </article>;
}
