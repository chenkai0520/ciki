import marked from 'marked';
import highlightjs from 'highlight.js';

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return highlightjs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
});

onmessage = function (e) {
    postMessage(marked(e.data[0]));
}