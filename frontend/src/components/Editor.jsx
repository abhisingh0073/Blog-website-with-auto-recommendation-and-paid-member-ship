// // src/Tiptap.tsx

// import { faBold, faCode, faLink, faListUl, faQuoteRight, faRotate, faRotateLeft, faRotateRight, faTable } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
// import StarterKit from '@tiptap/starter-kit'
// import Placeholder from '@tiptap/extension-placeholder'
// import Link from '@tiptap/extension-link'
// import Image from '@tiptap/extension-image'
// import Color from '@tiptap/extension-color'
// import { TextStyle } from '@tiptap/extension-text-style'
// import { Table } from '@tiptap/extension-table'
// import TableRow from '@tiptap/extension-table-row'
// import TableCell from '@tiptap/extension-table-cell'
// import TableHeader from '@tiptap/extension-table-header'
// import { faImage } from '@fortawesome/free-regular-svg-icons'
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// import { createLowlight } from 'lowlight'

// import javascript from 'highlight.js/lib/languages/javascript'
// import css from 'highlight.js/lib/languages/css'
// import html from 'highlight.js/lib/languages/xml'


// const lowlight = createLowlight()
// lowlight.register('javascript', javascript)
// lowlight.register('css', css)
// lowlight.register('html', html)






// // 1️⃣ ToolBar FIRST
// const ToolBar = ({ editor }) => {
//   const editorState = useEditorState({
//     editor,
//     selector: (ctx) => ({

//       activeHeading: ctx.editor.isActive('heading', {level: 1}) ? 'h1'
//              : ctx.editor.isActive('heading', {level: 2}) ? 'h2'
//              : ctx.editor.isActive('heading', {level: 3}) ? 'h3'
//              : 'paragraph',

//       isBold: ctx.editor.isActive('bold'),
//       canBold: ctx.editor.can().toggleBold(),

//       isBulletList: ctx.editor.isActive('bulletList'),
//       canBulletList: ctx.editor.can().toggleBulletList(),

//       isCodeBlock: ctx.editor.isActive('codeBlock'),
//       canCodeBlock: ctx.editor.can().toggleCodeBlock(),

//       isBlockquote: ctx.editor.isActive('blockquote'),
//       canBlockquote: ctx.editor.can().toggleBlockquote(),

//       canUndo: ctx.editor.can().undo(),
//       canRedo: ctx.editor.can().redo(),

//       isLink: ctx.editor.isActive('link'),


//     }),
//   });

//   if (!editor || !editorState) return null;

//   const setLink = () => {
//     const previousUrl = editor.getAttributes('link').href;
//     const url = window.prompt('URL', previousUrl);
//     if(url===null) return;
//     if(url===' '){
//         editor.chain().focus().extendMarkRange('link').unsetLink().run();
//         return;
//     }
//     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
//   }

  

//   return (
//     <div className="flex gap-1 border-b bg-slate-50 p-2">

//       <select
//         value={editorState.activeHeading}
//         onChange={(e) => {
//         const v = e.target.value;
//         const chain = editor.chain().focus();

//          if (v === 'paragraph') {
//             editor.chain().focus().setParagraph().run();
//           } else {
//             editor.chain().focus().setHeading({ level: Number(v[1]) }).run();
//           }
//         }}
//          className="px-2 py-1 border rounded-md text-sm bg-white"
//         >
//           <option value="paragraph">Paragraph</option>
//            <option value="h1">H1</option>
//            <option value="h2">H2</option>
//            <option value="h3">H3</option>
//       </select>

      

//       <div className='w-[1px] h-6 bg-slate-300 mx-1'/>
  

//       <MenuBtn
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         active={editorState.isBold}
//         disabled={!editorState.canBold}
//         icon={faBold}
//       />

//       <MenuBtn
//         onClick={() => editor.chain().focus().toggleBulletList().run()}
//         active={editorState.isBulletList}
//         disabled={!editorState.canBulletList}
//         icon={faListUl}
//       />

//       <MenuBtn
//         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         active={editorState.isCodeBlock}
//         disabled={!editorState.canCodeBlock}
//         icon={faCode}
//       />

//       <MenuBtn
//         onClick={() => editor.chain().focus().toggleBlockquote().run()}
//         active={editorState.isBlockquote}
//         disabled={!editorState.canBlockquote}
//         icon={faQuoteRight}
//       />

//       <div className="w-[1px] h-6 bg-slate-300 mx-1" />

//       <MenuBtn onClick={setLink} active={editorState.isLink} icon={faLink}/>


//       <MenuBtn onClick={() => {
//           const url = prompt('Image URL');
//           if (url) editor.chain().focus().setImage({ src: url }).run();
//         }} 
//         icon={faImage} 
//       />

//       <MenuBtn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={faTable} />


//       <div className="w-[1px] h-6 bg-slate-300 mx-1" />

//       {/* History */}
//       <MenuBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} icon={faRotateLeft} />
//       <MenuBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} icon={faRotateRight} />

//       {/* Color Picker */}
//       <input
//         type="color"
//         value={editor.getAttributes('textStyle').color || '#000000'}
//         onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
//         className="w-8 h-8 p-1 cursor-pointer bg-transparent border-none"
//         title="Text Color"
//       />
//     </div>


//   )
// };



// // 2️⃣ MenuBtn NEXT
// const MenuBtn = ({ onClick, active, icon, label, disabled }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className={`p-2 rounded-md min-w-[36px]
//         ${active ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200'}
//         ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
//       `}
//     >
//       <FontAwesomeIcon icon={icon} size="sm" />
//       {label && <span className="ml-1 text-xs">{label}</span>}
//     </button>
//   );
// };



// // 3️⃣ Tiptap LAST
// const Tiptap = ({ content, onChange }) => {
//   const editor = useEditor({
//     extensions: [
//         StarterKit.configure({
//             codeBlock: false,
//         }),
//         CodeBlockLowlight.configure({ lowlight }),
//         Placeholder.configure({ placeholder: 'Write here...' }),
//         Link.configure({
//           openOnClick: false,
//           HTMLAttributes: {
//             class: 'text-indigo-600 underline cursor-pointer',
//           },
//         }),
//         Image.configure({
//           HTMLAttributes: {
//             class: 'rounded-lg max-w-full h-auto',
//           },
//         }),
//         TextStyle,
//         Color,
//         Table.configure({ resizable: true }),
//         TableRow,
//         TableHeader,
//         TableCell,
//     ],
//     content,
//     onUpdate({ editor }) {
//     onChange(editor.getHTML());
//     },
//     editorProps: {
//   attributes: {
//     class:
//       'prose prose-slate max-w-none p-6 min-h-[70vh] text-lg leading-relaxed focus:outline-none',
//   },
// },

//   });

//   if (!editor) return null;

//   return (
//   <div className="rounded-lg bg-white h-[100vh] flex flex-col">
//     <div className="sticky top-0 z-10 bg-white">
//         <ToolBar editor={editor} />
//     </div>

//     {/* Scroll container */}
//     <div className="flex-1 overflow-y-auto">
//       <EditorContent editor={editor} />
//     </div>
//   </div>
// );

// }

// export default Tiptap;



import { useEffect } from "react";
import { faBold, faCode, faLink, faListUl, faQuoteRight, faRotateLeft, faRotateRight, faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight()
lowlight.register('javascript', javascript)
lowlight.register('css', css)
lowlight.register('html', html)


// ================= TOOLBAR =================
const ToolBar = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      activeHeading: ctx.editor.isActive('heading', { level: 1 }) ? 'h1'
        : ctx.editor.isActive('heading', { level: 2 }) ? 'h2'
          : ctx.editor.isActive('heading', { level: 3 }) ? 'h3'
            : 'paragraph',

      isBold: ctx.editor.isActive('bold'),
      canBold: ctx.editor.can().toggleBold(),

      isBulletList: ctx.editor.isActive('bulletList'),
      canBulletList: ctx.editor.can().toggleBulletList(),

      isCodeBlock: ctx.editor.isActive('codeBlock'),
      canCodeBlock: ctx.editor.can().toggleCodeBlock(),

      isBlockquote: ctx.editor.isActive('blockquote'),
      canBlockquote: ctx.editor.can().toggleBlockquote(),

      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),

      isLink: ctx.editor.isActive('link'),
    }),
  });

  if (!editor || !editorState) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  return (
    <div className="flex gap-1 border-b bg-[var(--bg-surface)] p-2">

      <select
        value={editorState.activeHeading}
        onChange={(e) => {
          const v = e.target.value;
          if (v === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: Number(v[1]) }).run();
          }
        }}
        className="px-2 py-1 border rounded-md text-sm bg-[var(--bg-color)]"
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
      </select>

      <div className='w-[1px] h-6 bg-[var(--bg-surface)] mx-1' />

      <MenuBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editorState.isBold} disabled={!editorState.canBold} icon={faBold} />
      <MenuBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editorState.isBulletList} disabled={!editorState.canBulletList} icon={faListUl} />
      <MenuBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editorState.isCodeBlock} disabled={!editorState.canCodeBlock} icon={faCode} />
      <MenuBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editorState.isBlockquote} disabled={!editorState.canBlockquote} icon={faQuoteRight} />

      <div className="w-[1px] h-6 bg-[var(--bg-surface)] mx-1" />

      <MenuBtn onClick={setLink} active={editorState.isLink} icon={faLink} />

      <MenuBtn onClick={() => {
        const url = prompt('Image URL');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }} icon={faImage} />

      <MenuBtn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={faTable} />

      <div className="w-[1px] h-6 bg-[var(--bg-surface)] mx-1" />

      <MenuBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo} icon={faRotateLeft} />
      <MenuBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo} icon={faRotateRight} />

      <input
        type="color"
        value={editor.getAttributes('textStyle').color || '#000000'}
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="w-8 h-8 p-1 cursor-pointer bg-transparent border-none"
        title="Text Color"
      />
    </div>
  )
};


// ================= BUTTON =================
const MenuBtn = ({ onClick, active, icon, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-md min-w-[36px]
        ${active ? 'bg-indigo-600 text-[var(--text-primary)]' : 'hover:bg-[var(--hover-bg)]'}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
      `}
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </button>
  );
};


// ================= TIPTAP =================
const Tiptap = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: 'Write here...' }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      TextStyle,
      Color,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "", // start empty
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none p-6 min-h-[70vh] text-lg leading-relaxed focus:outline-none',
      },
    },
  });

  // ✅ Sync incoming content into editor
  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    if (content && content !== current) {
      editor.commands.setContent(content, false);
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="rounded-lg bg-white h-[100vh] flex flex-col">
      <div className="sticky top-0 z-10 bg-white">
        <ToolBar editor={editor} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;

