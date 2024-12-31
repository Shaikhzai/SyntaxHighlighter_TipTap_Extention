import { Node } from '@tiptap/core';
import { lowlight } from 'lowlight/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

// Register languages with Lowlight
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('python', python);

export const CodeBlock = Node.create({
  name: 'codeBlock',

  group: 'block',

  content: 'text*',

  marks: '',

  code: true,

  defining: true,

  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: element => element.getAttribute('data-language'),
        renderHTML: attributes => {
          if (!attributes.language) {
            return {};
          }
          return {
            'data-language': attributes.language,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre[data-language]',
      },
    ];
  },

  renderHTML({ node }) {
    return [
      'pre',
      { 'data-language': node.attrs.language },
      ['code', { class: `language-${node.attrs.language}` }, 0],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      const language = node.attrs.language || 'plaintext';

      code.className = `language-${language}`;
      pre.appendChild(code);

      const highlighted = lowlight.highlight(language, node.textContent).value;
      code.innerHTML = highlighted;

      return { dom: pre };

      
    };
  },
});
