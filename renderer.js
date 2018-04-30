const marked = require('marked');
const renderer = new marked.Renderer();

const noWrap = (input) => input;
const renderAsBlock = (input) => `${input}\n\n`;

renderer.heading = renderAsBlock;
renderer.paragraph = renderAsBlock;
renderer.list = (body) => `${body}\n`;
renderer.listitem = (text) => ` — ${text}\n`;
renderer.code = (text) => renderAsBlock;
renderer.blockquote = (text) => renderAsBlock(`«${text}»`);
renderer.hr = () => '----------';

renderer.codespan = noWrap;
renderer.strong = noWrap;
renderer.em = noWrap;
renderer.del = noWrap;
renderer.image = (href, title, text) => title ? `${title} — ${href}` : href;

renderer.link = (href, title, text) => `${text} — ${href}`;

module.exports = renderer;
