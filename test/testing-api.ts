import { glob } from 'glob';
import { API, Post } from '../src/types';

export const createTestApi = async (): Promise<API> => {
    const postFiles = await glob("./blog-export/**/post.json");
    const posts = await Promise.all(postFiles.map(async (path) => {
        const file = Bun.file(path);
        return await file.json();
    }));

    return {
        getPosts: async (): Promise<Post[]> => {
            return posts;
        },
        getPublishedPosts: async (): Promise<Post[]> => {
            return posts;
        },
        getPost: async (id: string): Promise<Post> => {
            return { id, content: "Post content", photos: [], createdAt: 0, publishedAt: 0 }
        },
        save: async (_content: String, _path: String): Promise<void> => {
        },
        savePhoto: async (_postId: String, _photoId: String, _path: String, _width: number, _height: number): Promise<void> => {
        },
        copy: async (_source: String, _destination: String): Promise<void> => {
        },
        deletePath: async (_path: String): Promise<void> => {
        }
    }
}
