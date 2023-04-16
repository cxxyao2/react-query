import { useState } from 'react'
import PostList1 from './PostList1'
import PostList2 from './PostList2'
import Post from './Post'
import CreatePost from './CreatePost'
// /posts    = > ["posts"]
// /posts/1 => ["posts", post.id]
// /posts?authorId=1  => ["posts", { authorId: 1 }]
// /posts/2/comments  => ["posts", post.id, "comments"]
// /posts?author=1&sort=asc

function App() {
	const [postId, setPostId] = useState(1)
	const [currentPage, setCurrentPage] = useState(<PostList1 />)

	return (
		<div>
			<button onClick={() => setCurrentPage(<PostList1 />)}>Post List 1</button>
			<button onClick={() => setCurrentPage(<PostList2 />)}>Post List 2</button>
			<label>
				Input Posit Id
				<input
					type='number'
					onChange={(event) =>
						setPostId(event.target.value as unknown as number)
					}></input>
			</label>

			<button onClick={() => setCurrentPage(<Post id={postId} />)}>
				First Post
			</button>
			<button onClick={()=>setCurrentPage(<CreatePost setCurrentPage={setCurrentPage}/>)}>Create Post</button>
			{currentPage}
		</div>
	)
}

function wait(duration: number) {
	return new Promise((resolve) => setTimeout(resolve, duration))
}

export default App
