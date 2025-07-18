import { assert, describe, it } from 'vitest';
import { createTheme } from '../src/theme';
import { API, Post, Website } from '../src/types';

const api: API = {
    getPosts: async (): Promise<Post[]> => {
        return [];
    },
    getPublishedPosts: async (): Promise<Post[]> => {
        return [];
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

const website: Website = {
    id: '4321-8765',
    name: 'Test blog',
    hostname: '',
    websiteUrl: '',
    basePath: '',
    hasUpdatedSettings: false,
    settings: {}
}

describe("initialisation test", () => {
    it("should return theme", async () => {
        const theme = await createTheme({ api, website });
        assert.isObject(theme);
        assert.isFunction(theme.setup);
        assert.isFunction(theme.update);
        assert.isFunction(theme.addPost);
        assert.isFunction(theme.deletePost);
        assert.isFunction(theme.getPostPath);
    });
});
