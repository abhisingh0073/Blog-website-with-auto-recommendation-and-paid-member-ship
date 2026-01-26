import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

const LANGUAGES = [
  { label: 'Auto', value: null },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
]

export default function CodeBlock({ node, updateAttributes }) {
  const language = node.attrs.language

  return (
    <NodeViewWrapper className="relative">
      {/* Language selector */}
      <select
        value={language || ''}
        onChange={(e) =>
          updateAttributes({
            language: e.target.value || null,
          })
        }
        className="absolute top-2 right-2 z-10 rounded bg-slate-800 text-slate-100 text-xs px-2 py-1 border border-slate-600"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.label} value={lang.value || ''}>
            {lang.label}
          </option>
        ))}
      </select>

      {/* Code content */}
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  )
}
