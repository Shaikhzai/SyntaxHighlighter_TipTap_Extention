'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlock } from '../components/CodeBlock';
import 'prismjs/themes/prism.css';

export default function Home() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock, // Custom extension
    ],
    content: `
      <p>Type some code below:</p>
      <pre data-language="javascript">
        <code>console.log('Hello, World!');</code>
      </pre>
    `,
  });

  return (
    <div>
      <h1>Syntax Highlighter Editor</h1>
      <EditorContent editor={editor} />
    </div>
  );
}
