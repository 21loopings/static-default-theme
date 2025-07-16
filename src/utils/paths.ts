import { Photo, PhotoSize, Post, Website } from "../types";
import 'core-js/proposals/url';

export const getPostRelativePath = (post: Post) => {
    const date = new Date(post.publishedAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const datePath = `${year}/${month}/${day}`
    return `${datePath}/${post.id}`;
}

export const getPostBaseUrl = ({ post, website }: { post: Post, website: Website }) => {
    return join(website.websiteUrl, getPostRelativePath(post));
}

export const getPostBasePath = ({ post, website }: { post: Post, website: Website }) => {
    return join(website.basePath, getPostRelativePath(post));
}

export const getLinkToPhoto = ({ photo, post, website, size }: { photo: Photo, post: Post, website: Website, size: PhotoSize }) => {
    return join(
        getPostBasePath({ post, website }),
        `${photo.id}-${size.valueOf()}.jpg`
    );
}

export const getPhotoURL = ({ photo, post, website, size }: { photo: Photo, post: Post, website: Website, size: PhotoSize }) => {
    return join(
        getPostBaseUrl({ post, website }),
        `${photo.id}-${size.valueOf()}.jpg`
    );
}

export const getArchiveUrl = ({ website }: { website: Website }) => {
    return join(website.websiteUrl, 'archive.html');
}

const joinPathElements = (...args: string[]): string => {
    return args.map((path) => {
        path = path.replace(/^\/*/, '');
        path = path.replace(/\/*$/, '');
        return path;
    })
        .filter((p) => p)
        .join('/');
}

const hasFilenameWithSuffix = (path: string): boolean => {
    return !!path.match(/.*\.\w*$/);
}

export const join = (...args: string[]): string => {
    if (args.length == 0) {
        return '/';
    }
    var urlOrigin = '';
    var firstArg = args[0];
    try {
        const url = new URL(firstArg);
        urlOrigin = url.origin;
        firstArg = url.pathname;
    } catch (error) {
    }
    const elements = [firstArg, ...args.slice(1, args.length)]
    const path = `${urlOrigin}/${joinPathElements(...elements)}`;
    return hasFilenameWithSuffix(path) ? path : `${path}/`;
}

