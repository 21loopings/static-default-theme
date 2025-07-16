import { formatMarkdown } from '../utils/markdown';
import { escapeHtml, jsxToString } from '../react/jsx-runtime';
import { getPhotoURL, getPostBaseUrl, join } from '../utils/paths';
import { PhotoSize } from '../types';
import fm from 'front-matter';

const Photos = ({ post, website }) => {
    return post.photos.map((photo) =>
        <figure>
            <picture>
                <img src={getPhotoURL({ photo, post, website, size: PhotoSize.thumbnail })} />
            </picture>
        </figure>
    )
}

const FeedPost = ({ post, website }) => {
    const postLink = getPostBaseUrl({ post, website });
    const publishedAt = new Date(post.publishedAt);
    const { attributes, body: content } = fm(post.content);
    const markdown = formatMarkdown({ content, post, website });
    const title = post.title ?? attributes.title ?? `Post from ${publishedAt.toDateString()}`

    return <item>
        <pubDate>{publishedAt.toUTCString()}</pubDate>
        <link>{postLink}</link>
        <guid isPermaLink="true">{postLink}</guid>
        <title>{title}</title>
        <description>
            {escapeHtml(markdown)}
            {escapeHtml(jsxToString(<Photos post={post} website={website} />))}
        </description>
        {
            post.photos.map((photo) => {
                const url = getPhotoURL({ photo, post, website, size: PhotoSize.thumbnail });
                return <enclosure url={url} type="image/jpeg" />;
            })
        }
    </item>
}

export const Feed = ({ website, posts }) => {
    const feedURL = join(website.websiteUrl, 'feed.xml');
    return <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>{website.name}</title>
            <description>{website.name}</description>
            <link>{website.websiteUrl}</link>
            <atom:link href={feedURL} rel="self" type="application/rss+xml" />
            <pubDate>{new Date().toUTCString()}</pubDate>
            <lastBuildDate>Fri, 28 Jan 2022 10:17:12 +0100</lastBuildDate>
            <generator>Static</generator>
            {posts.map((post) => <FeedPost post={post} website={website} />)}
        </channel>
    </rss>
}
