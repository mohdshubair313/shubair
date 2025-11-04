import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base my-3 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside my-3">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside my-3">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="my-1">{children}</li>
    ),
    code: ({ children, className }) => (
      <code className={`${className} bg-gray-200 px-2 py-1 rounded`}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-blue-600 underline hover:text-blue-800">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3">
        {children}
      </blockquote>
    ),
    ...components,
  }
}
