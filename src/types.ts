
export interface Website {
    id: string;
    name: string;
    hostname: string;
    websiteUrl: string;
    basePath: string;
    hasUpdatedSettings: boolean;
    settings: {
        subtitle?: { stringValue: string },
    };
}

export interface Post {
    id: string;
    createdAt: number;
    publishedAt: number;
    content: string;
    photos: [Photo];
}

export interface Photo {
    id: string;
    sortIndex: number;
    itemIdentifier: string;
}

export enum PhotoSize {
    thumbnail = 320,
    small = 800,
    big = 1920
}

export interface API {
    getPosts: () => Promise<[Post]>;
    getPublishedPosts: () => Promise<[Post]>;
    getPost: (id: string) => Promise<Post>;
    save: (content: String, path: String) => Promise<void>;
    savePhoto: (postId: String, photoId: String, path: String, width: number, height: number) => Promise<void>;
    copy: (source: String, destination: String) => Promise<void>;
    deletePath: (path: String) => Promise<void>;
}

