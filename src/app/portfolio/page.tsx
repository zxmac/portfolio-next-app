// Dummy imports
// import { getPosts } from '@/lib/posts'
// import { Post } from '@/ui/post'
 
export default async function Page() {
  const posts: any = [{id: 123, post: 'Test portfolio!!!'}];
 
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.post}</li>
      ))}
    </ul>
  )
}