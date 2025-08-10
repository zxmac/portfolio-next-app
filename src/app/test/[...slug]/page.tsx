// "use client"
import { use } from 'react'

 
export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = use(params)
  console.log(slug);
  return (
    <div>
      <p>{slug}</p>
    </div>
  )
}

// import { useSearchParams } from 'next/navigation';
// import React from 'react';

// export async function generateStaticParams() {
//   // List of slugs you want to pre-render
//   return [
//     { slug: 'one' },
//     { slug: 'two' },
//     { slug: 'three' }
//   ];
// }

// export default function Page() {
//     const searchParams = useSearchParams() 
//         const apiKey = searchParams.get('a')!
//         const sheetId = searchParams.get('s')!

//         // const p: any = use(searchParams)
//   return (
//     <div>
//       <h1>Slug: {apiKey} | {sheetId}</h1>
//     </div>
//   );
// }
