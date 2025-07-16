import { Divider } from '../components/Divider';
import { getArchiveUrl } from '../utils/paths';

const ArchiveLink = ({ website }) => {
    return <a href={getArchiveUrl({ website })}>Archive</a>
}

export const Footer = ({ website, showArchive = false }) => {
    return <div id="footer">
        <Divider />
        {showArchive && <ArchiveLink website={website} />}
    </div>;
};

export default Footer;
