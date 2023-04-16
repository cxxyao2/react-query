import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts } from './api/posts'

// /posts    = > ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1  => ["posts", { authorId: 1 }]
// /posts/2/comments  => ["posts", post.id, "comments"]
// /posts?author=1&sort=asc

function PostList2() {
	const queryClient = useQueryClient()
	const postsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts
	})

	if (postsQuery.isLoading) return <h1>Loading...</h1>
	if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

	return (
		<div>
			<h1>Post List 2</h1>
			<ol>
				{postsQuery.data.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ol>
		</div>
	)
}

export default PostList2
