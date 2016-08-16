const marked = require('marked');
const renderer = new marked.Renderer();

renderer.heading = (text) => `${text}\n\n`;
renderer.paragraph = (text) => `${text}\n\n`;
renderer.list = (body) => `${body}\n`;
renderer.listitem = (text) => `${text}\n`;

renderer.link = (href, title, text) => `${text} — ${href}`;

module.exports = renderer;
