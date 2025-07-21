import { join } from "../utils/paths";

export const Header = ({ website }) => {
    return <>
        <h1>
            <a href={join(website.websiteUrl)}>{website.name}</a>
        </h1>
        {website.settings.subtitle && <h2>{website.settings.subtitle.stringValue}</h2>}
    </>;
};

export default Header;
