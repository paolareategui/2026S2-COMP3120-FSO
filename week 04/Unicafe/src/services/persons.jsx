import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
   return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deleteByID = personID => {
    return axios.delete(`${baseUrl}/${personID}`)
}

const update = (newNumber, personID) => {
    return axios.put(`${baseUrl}/${personID}`, newNumber)
}

export default {
    getAll: getAll,
    create: create,
    deleteByID: deleteByID,
    update: update
}