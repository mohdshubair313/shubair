import Image, { ImageProps } from 'next/image'

type MDXImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
    src: ImageProps['src']
}

export function MDXImage({
    src,
    alt,
    width = 800,
    height = 400,
    className,
}: MDXImageProps) {
    if (!src) return null

    // Handle external images or absolute paths if needed, 
    // but for now assuming standard usage or relative paths handled by build

    return (
        <span className={`block my-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 ${className || ''}`}>
            <Image
                src={src}
                alt={alt || 'Blog image'}
                width={Number(width)}
                height={Number(height)}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {alt && (
                <span className="block mt-2 text-center text-sm text-gray-500 dark:text-gray-400 italic">
                    {alt}
                </span>
            )}
        </span>
    )
}
