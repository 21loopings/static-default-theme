export const jsx = (tag, props, ...children) => {
    // const { children, ...attributes } = props ?? {};
    if (typeof tag === 'function') return tag(props, children);
    // return { tag, attributes, children: normalizedChildren(children) };
    return { tag, attributes: props, children: normalizedChildren(children) };
};

export const jsxs = jsx;
export const React = {};

export const jsxToString = (_jsx) => {
    indentLevel = 0;
    return _jsxToString(_jsx);
}

export const Fragment = ({ children }) => {
    return _jsxToString(children);
}

export const escapeHtml = (html) => {
    return html.replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

const selfClosingTags = ['input', 'hr', 'br', 'img', 'col', 'embed', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

const _jsxToString = (_jsx) => {
    if (!_jsx) {
        return '';
    }
    if (typeof _jsx === "string") {
        return _jsx;
    }
    if (typeof _jsx === "number") {
        return String(_jsx);
    }
    if (Array.isArray(_jsx)) {
        return renderedChildren(_jsx)
    }
    const { tag, attributes, children } = _jsx;
    if (!tag) {
        return '';
    }
    const isSelfClosingTag = selfClosingTags.includes(tag);
    const renderedAttributes = attributes ? Object.entries(attributes)
        .map(([key, value]) => ` ${key}="${value}"`)
        .join('') : '';
    if (isSelfClosingTag && (!children || children.length == 0 || !children[0])) {
        return `${indentation()}<${tag}${renderedAttributes}/>\n`;
    } else {
        const newline = isText(children) ? '' : '\n';
        const newlineWithIndentation = isText(children) ? '' : `${indentation()}`;
        return `${indentation()}<${tag}${renderedAttributes}>${newline}${renderedChildren(children)}${newlineWithIndentation}</${tag}>\n`;
    }
}

var indentLevel = 0;
const renderedChildren = (children) => {
    indentLevel++;
    const ret = children.map((child) => _jsxToString(child)).join('');
    indentLevel--;
    return ret;
}

const indentation = () => {
    return '  '.repeat(indentLevel);
}

const isText = (jsx) => {
    return typeof jsx === 'string' ||
        Array.isArray(jsx) && jsx.filter((s) => typeof s !== 'string').length == 0;
}

const normalizedChildren = (children) => {
    return Array.isArray(children) ? children : [children];
}

