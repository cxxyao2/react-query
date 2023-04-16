import axios from 'axios'

export function getPosts() {
	//	return async () => wait(1000).then(() => [...POSTS])
	// return [...POSTS]
	return axios
		.get('http://localhost:8000/posts', { params: { _sort: 'title' } })
		.then((res) => res.data)
}

export function getPost(id: number) {
	//	return async () => wait(1000).then(() => [...POSTS])
	// return [...POSTS]
	return axios.get(`http://localhost:8000/posts/${id}}`).then((res) => {
		console.log(res.data)
		return res.data
	})
}

export function createPost({ title, body }: { title: string; body: string }) {
	return axios
		.post('http://localhost:8000/posts', { title, body })
		.then((res) => res.data)
}
// const newPostMutation = useMutation({
// 	mutationFn: (title: string) => {
// 		return wait(1000).then(() => POSTS.push({ id: crypto.randomUUID, title }))
// 	},
// 	onSuccess: () => {
// 		queryClient.invalidateQueries(['posts'])
// 	}
// })
