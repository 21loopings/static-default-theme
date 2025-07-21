import { expect, test, describe } from "bun:test";
import { createTheme } from '../src/theme';
import { Website } from '../src/types';
import { createTestApi } from './testing-api';

const website: Website = {
    id: '4321-8765',
    name: 'Test blog',
    hostname: '',
    websiteUrl: 'https://example.org/test',
    basePath: '/test',
    hasUpdatedSettings: false,
    settings: {}
};

describe("initialisation test", () => {
    test("should return theme", async () => {
        const api = await createTestApi();
        const theme = await createTheme({ api, website });
        expect(theme).toBeObject();
        expect(theme.setup).toBeFunction();
        expect(theme.update).toBeFunction();
        expect(theme.addPost).toBeFunction();
        expect(theme.deletePost).toBeFunction();
        expect(theme.getPostPath).toBeFunction();
    });
});
