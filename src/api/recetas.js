import axios from 'axios';
const options = {
method: 'GET',
url: 'http://localhost:8081/api/v1/recetas/all',

};


export default {axios, options};