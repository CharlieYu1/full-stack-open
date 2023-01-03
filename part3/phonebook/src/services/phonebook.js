import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND}/api/persons`
console.log(baseUrl)

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const phonebookService = {
    getAll: getAll,
    create: create,
    update: update,
    del: del,
}

export default phonebookService;