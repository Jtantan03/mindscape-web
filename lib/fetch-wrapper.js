const baseURL = import.meta.env.VITE_API

function get(url, option) {
	return fetch(baseURL + url, option)
}

function post(url, data) {
	return fetch(baseURL + url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		},
		body: JSON.stringify(data)
	})
}

function put(url, data) {
	return fetch(baseURL + url, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		},
		body: JSON.stringify(data)
	})
}

function patch(url, data) {
	return fetch(baseURL + url, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		},
		body: JSON.stringify(data)
	})
}

function _delete(url) {
	return fetch(baseURL + url, {
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		}
	})
}

export const app = {
	get,
	post,
	put,
	patch,
	delete: _delete,
}
