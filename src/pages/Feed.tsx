/* eslint-disable */
import { formatMarkdown } from '../utils/markdown';
import { jsxToString, escapeHtml } from '../utils/jsx-support';
import { getPhotoURL, getPostBaseUrl, join } from '../utils/paths';
import { PhotoSize, Post, Website } from '../types';
import fm from 'front-matter';

declare module 'preact' {
    namespace JSX {
        interface IntrinsicElements {
            'item': preact.JSX.HTMLAttributes<HTMLElement>;
            'pubDate': preact.JSX.HTMLAttributes<HTMLElement>;
            'guid': preact.JSX.HTMLAttributes<HTMLElement> & { isPermaLink: string };
            'description': preact.JSX.HTMLAttributes<HTMLElement>;
            'enclosure': preact.JSX.HTMLAttributes<HTMLElement> & { url: string, type: string };
            'rss': preact.JSX.HTMLAttributes<HTMLElement> & { version: string, 'xmlns:atom': string };
            'channel': preact.JSX.HTMLAttributes<HTMLElement>;
            'atom:link': preact.JSX.HTMLAttributes<HTMLElement> & { href: string, 'rel': string, 'type': string };
            'lastBuildDate': preact.JSX.HTMLAttributes<HTMLElement>;
            'generator': preact.JSX.HTMLAttributes<HTMLElement>;
        }
    }
}

const Photos = ({ post, website }: { post: Post, website: Website }) => {
    return post.photos.map((photo) =>
        <figure>
            <picture>
                <img src={getPhotoURL({ photo, post, website, size: PhotoSize.thumbnail })} />
            </picture>
        </figure>
    )
}

const FeedPost = ({ post, website }: { post: Post, website: Website }) => {
    const postLink = getPostBaseUrl({ post, website });
    const publishedAt = new Date(post.publishedAt);
    const { attributes, body: content } = fm(post.content);
    const markdown = formatMarkdown({ content, post, website });
    const title = post.title ?? (attributes as any).title ?? `Post from ${publishedAt.toDateString()}`

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

export const Feed = ({ website, posts }: { website: Website, posts: Post[] }) => {
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
