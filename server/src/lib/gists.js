const axios = require('axios')
const baseURL = 'https://api.github.com'

//Gets a user's gists
async function getUserGists(username){
    var gists = [];
    await axios
        .get(`${baseURL}/users/${username}/gists`)
        .then(res => {
                gists = res.data;
            })
        .catch(error => {
            console.error(error)
        })
    return gists;
};

//Get a list of gists by ID
async function getGists(idArray){
    var gists = [];
    await Promise.all(
        idArray.map(async(id) => {
        await axios
            .get(`${baseURL}/gists/${id}`)
            .then(res => {
                gists.push(res.data)
            })
            .catch(error => {
                console.error(error)
            })
    }))
    return gists
};

module.exports = {getUserGists, getGists};