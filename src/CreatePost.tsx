import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from './api/posts'
import { useRef } from 'react'
import Post from './Post'

// /posts    = > ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1  => ["posts", { authorId: 1 }]
// /posts/2/comments  => ["posts", post.id, "comments"]
// /posts?author=1&sort=asc

function CreatePost({
	setCurrentPage
}: {
	setCurrentPage: (currentPage: JSX.Element) => void
}) {
	const titleRef = useRef<HTMLInputElement>(null)
	const bodyRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()

	// onMutate is executed before the mutationFn is executed
	const createPostMutation = useMutation({
		mutationFn: createPost,

		onSuccess: (data, variables, context) => {
			queryClient.setQueryData(['posts', data.id], data)
			queryClient.invalidateQueries(['posts'])
			setCurrentPage(<Post id={data.id} />)
			console.log(context)
		},
		onMutate: (variables) => {
			return { hi: 'Bye' }
		}
	})

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		createPostMutation.mutate({
			title: titleRef.current?.value ?? '',
			body: bodyRef.current?.value ?? ''
		})
	}

	return (
		<div>
			{createPostMutation.isError && JSON.stringify(createPostMutation.error)}
			<h1>Create Post</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title</label>
					<input type='text' id='title' ref={titleRef} />
				</div>
				<div>
					<label htmlFor='body'>Body</label>
					<input type='text' id='body' ref={bodyRef} />
				</div>
				<button disabled={createPostMutation.isLoading} type='submit'>
					{createPostMutation.isLoading ? 'Loading...' : 'Create Post'}
				</button>
			</form>
		</div>
	)
}

export default CreatePost
