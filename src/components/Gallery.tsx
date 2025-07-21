import { PhotoSize } from '../types';
import { getLinkToPhoto } from '../utils/paths';

export const Gallery = ({ post, website }) => {
    const length = post.photos.length;

    let lengthClass = 'gallery-1';
    if (length == 2) lengthClass = 'gallery-2';
    if (length > 2) lengthClass = 'gallery-3';

    return <div class='gallery-container'>
        <div class={'gallery ' + lengthClass}>
            {post.photos.map((photo) =>
                <figure>
                    <picture>
                        <source media="(min-width:650px)" srcset={getLinkToPhoto({ photo, post, website, size: PhotoSize.small })} />
                        <source media="(min-width:465px)" srcset={getLinkToPhoto({ photo, post, website, size: PhotoSize.thumbnail })} />
                        <img src={getLinkToPhoto({ photo, post, website, size: PhotoSize.big })} />
                    </picture>
                </figure>
            )}
        </div>
    </div>;
}

