import { jsxToString } from './react/jsx-runtime';
import { Website, Post, API, PhotoSize } from './types';
import { Home } from './pages/Home';
import { Feed } from './pages/Feed';
import { ArchivePage } from './pages/ArchivePage';
import { PostPage } from './pages/PostPage';
import { getPostBaseUrl, getPostRelativePath, join } from './utils/paths';

export const createTheme = async ({ api, website }: {
    api: API,
    website: Website
}) => {
    const posts = await api.getPublishedPosts();

    const save = async (path: string, jsx: any) => {
        const html = jsxToString(jsx)
        await api.save(html, path);
    }

    const setup = async () => {
        await api.copy("resources", "/");
    }

    const update = async () => {
        if (website.hasUpdatedSettings) {
            console.log(`TODO: settings have changed, we need to re-publish blog's HTML`);
            console.log(`  website.hasUpdatedSettings = ${website.hasUpdatedSettings}`);
        }
    }

    const addPost = async (post: Post) => {
        const small = PhotoSize.small.valueOf();
        const big = PhotoSize.big.valueOf();
        const thumbnail = PhotoSize.thumbnail.valueOf();
        const path = getPostRelativePath(post);
        for (let photo of post.photos) {
            await api.savePhoto(post.id, photo.id, join(path, `${photo.id}-${thumbnail}.jpg`), thumbnail, thumbnail);
            await api.savePhoto(post.id, photo.id, join(path, `${photo.id}-${small}.jpg`), small, small);
            await api.savePhoto(post.id, photo.id, join(path, `${photo.id}-${big}.jpg`), big, 720);
        }

        await save(join(path, 'index.html'), <PostPage website={website} post={post} />);
        await savePostRelatedDocuments(post);
    }

    const deletePost = async (post: Post) => {
        const path = getPostRelativePath(post);
        await api.deletePath(path);
        await savePostRelatedDocuments(post);
    }

    const savePostRelatedDocuments = async (post: Post) => {
        const lastPosts = posts.slice(0, 10);
        await save('/index.html', <Home website={website} posts={lastPosts} />);
        await save('/feed.xml', <Feed website={website} posts={lastPosts} />);
        await save('/archive.html', <ArchivePage website={website} posts={posts} />);
    }

    const getPostPath = (post: Post) => {
        return getPostBaseUrl({ website, post });
    }

    return {
        setup,
        update,
        addPost,
        deletePost,
        getPostPath
    }
}
