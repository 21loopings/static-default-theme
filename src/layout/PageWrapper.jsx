import Header from "./Header";
import Footer from "./Footer";
import { join } from '../utils/paths';

export const PageWrapper = ({ website, showArchive = false }, children) => {
    const cssPath = join(website.basePath, 'resources/screen.css');
    const galleryPath = join(website.basePath, 'resources/gallery.js');
    const rssURL = join(website.basePath, 'feed.xml');
    return <html>
        <head>
            <title>{website.name}</title>
            <link rel="stylesheet" type="text/css" href={cssPath} />
            <link rel="alternate" type="application/rss+xml" title={website.name} href={rssURL} />
            <meta name="viewport" content="width=device-width" />
            <meta charset="UTF-8" />
        </head>
        <body>
            <Header website={website} />

            {children}

            <div id="gallery-modal">
                <div class="gallery-close-button">&times;</div>
                <div class="gallery-img-wrapper">
                    <img class="gallery-img" />
                </div>
            </div>

            <Footer website={website} showArchive={showArchive} />

            <script src={galleryPath} type="text/javascript" charset="utf-8">
            </script>
        </body>
    </html>
};

