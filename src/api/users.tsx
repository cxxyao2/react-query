import axios from 'axios'

export function getUsers() {
	return axios
		.get('http://localhost:8000/users', { params: { _sort: 'title' } })
		.then((res) => res.data)
}

export function getUser(id: number) {
	return axios.get(`http://localhost:8000/Users/${id}}`).then((res) => {
		console.log(res.data)
		return res.data
	})
}
