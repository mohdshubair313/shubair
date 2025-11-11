import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import NextImage from 'next/image'
 
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'OgImage.png'), 'base64')
  const logoSrc = `data:image/png;base64,${logoData}`
 
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <NextImage src={logoSrc} alt="Logo" width={100} height={100} />
      </div>
    )
  )
}