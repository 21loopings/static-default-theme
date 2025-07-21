import { VNode } from 'preact';
import { render } from 'preact-render-to-string';

export const jsxToString = (_jsx: VNode<any>): string => {
    return render(_jsx, { jsx: true });
}

export const escapeHtml = (html: string): string => {
    return html.replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
