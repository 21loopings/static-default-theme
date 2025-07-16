import { marked } from 'marked';
import { PhotoSize } from '../types';
import { getLinkToPhoto } from './paths';

export const formatMarkdown = ({ content, post, website }) => {
    return marked.use({
        extensions: [{
            name: 'image',
            renderer(token) {
                const photo = post.photos.find((photo) => photo.id == token.href);
                const link = photo
                    ? (size) => getLinkToPhoto({ website, post, photo, size })
                    : () => token.href;
                return `<div class="gallery markdown-image">
        <figure>
            <picture>
                <source media="(min-width:650px)" srcset="${link(PhotoSize.small)}" />
                <source media="(min-width:465px)" srcset="${link(PhotoSize.thumbnail)}" />
                <img src="${link(PhotoSize.big)}" />
            </picture>
        </figure>
`;
            }
        }]
    })
        .parse(content);
};

