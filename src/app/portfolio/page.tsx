interface Post {
  id: number;
  post: string;
}
export default async function Page() {
  const posts: Post[] = [{id: 123, post: 'Test portfolio!!!'}];
 
  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>{post.post}</li>
      ))}
    </ul>
  )
}