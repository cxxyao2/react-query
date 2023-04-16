import { useQuery, useMutation } from '@tanstack/react-query'
import { getPost, getPosts } from './api/posts'
import { getUser } from './api/users'

// /posts    = > ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1  => ["posts", { authorId: 1 }]
// /posts/2/comments  => ["posts", post.id, "comments"]
// /posts?author=1&sort=asc

function Post({ id }) {
	const postsQuery = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPost(id)
	})

	const userQuery = useQuery({
		queryKey: ['users', postsQuery.data?.userId],
		enabled: !!postsQuery.data?.userId,
		queryFn: () => getUser(postsQuery.data.userId)
	})

	if (postsQuery.isLoading) return <h1>Loading...</h1>
	if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

	return (
		<>
			<h1>
				{postsQuery.data.title}
				<small>
					{postsQuery.data.id}
					{userQuery.isLoading
						? 'Loading user...'
						: userQuery.isError
						? 'Error Loading User'
						: userQuery.data.id &&
						  ` by ${userQuery.data.name} : ${userQuery.data.series}`}
				</small>
			</h1>
			<p>{postsQuery.data.body}</p>
		</>
	)
}

export default Post
