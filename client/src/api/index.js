import axios from 'axios';

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000'
})

// USERS
export const getUser = (token, email) => 
    rest.get(`/api/user/${email}`)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));
export const createUser = (token, payload) => 
    rest.post(`/api/user`, payload)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));
export const updateUser = (token, id, payload) => 
    rest.put(`/api/user/${id}`, payload)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));

// PROJECTS
export const createProject = (token, payload) => 
    rest.post(`/api/project`, payload)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));
export const updateProject = (token, id, payload) => 
    rest.put(`/api/project/${id}`, payload)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));

const apis = {
    getUser,
    createUser,
    updateUser,
    createProject,
    updateProject
}

export default apis;