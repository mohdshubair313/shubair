import Link from 'next/link'
import { MDXImage } from '@/components/ui/mdx-image'
import { ComponentPropsWithoutRef } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

export const mdxComponents = {
    h1: ({ className, ...props }: HeadingProps) => (
        <h1
            className={`mt-2 scroll-m-20 text-4xl font-bold tracking-tight ${className}`}
            {...props}
        />
    ),
    h2: ({ className, ...props }: HeadingProps) => (
        <h2
            className={`mt-10 scroll-m-20 border-b border-gray-200/80 dark:border-white/10 pb-1 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
            {...props}
        />
    ),
    h3: ({ className, ...props }: HeadingProps) => (
        <h3
            className={`mt-8 scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
            {...props}
        />
    ),
    h4: ({ className, ...props }: HeadingProps) => (
        <h4
            className={`mt-8 scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
            {...props}
        />
    ),
    h5: ({ className, ...props }: HeadingProps) => (
        <h5
            className={`mt-8 scroll-m-20 text-lg font-semibold tracking-tight ${className}`}
            {...props}
        />
    ),
    h6: ({ className, ...props }: HeadingProps) => (
        <h6
            className={`mt-8 scroll-m-20 text-base font-semibold tracking-tight ${className}`}
            {...props}
        />
    ),
    a: ({ className, href, ...props }: AnchorProps) => {
        if (href?.startsWith('/')) {
            return (
                <Link
                    href={href}
                    className={`font-medium underline underline-offset-4 ${className}`}
                    {...props}
                />
            )
        }
        if (href?.startsWith('#')) {
            return (
                <a
                    href={href}
                    className={`font-medium underline underline-offset-4 ${className}`}
                    {...props}
                />
            )
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium underline underline-offset-4 ${className}`}
                {...props}
            />
        )
    },
    p: ({ className, ...props }: ParagraphProps) => (
        <p
            className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}
            {...props}
        />
    ),
    ul: ({ className, ...props }: ListProps) => (
        <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`} {...props} />
    ),
    ol: ({ className, ...props }: ListProps) => (
        <ol className={`my-6 ml-6 list-decimal [&>li]:mt-2 ${className}`} {...props} />
    ),
    li: ({ className, ...props }: ListItemProps) => (
        <li className={`mt-2 ${className}`} {...props} />
    ),
    blockquote: ({ className, ...props }: BlockquoteProps) => (
        <blockquote
            className={`mt-6 border-l-2 pl-6 italic ${className}`}
            {...props}
        />
    ),
    img: MDXImage,
    Image: MDXImage,
    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={`w-full ${className}`} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className={`m-0 border-t p-0 even:bg-muted ${className}`} {...props} />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={`border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
            {...props}
        />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={`border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
            {...props}
        />
    ),
    // 💡 FIX: Theme-aware background for block code
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className={`mb-4 mt-6 overflow-x-auto rounded-lg border-gray-100 bg-gray-100 dark:bg-black py-4 ${className}`}
            {...props}
        />
    ),
    // 💡 FIX: Explicit light mode colors for inline code
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={`relative rounded bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
            {...props}
        />
    ),
}