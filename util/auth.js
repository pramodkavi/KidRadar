import axios from 'axios';

const API_KEY = 'AIzaSyCrYhZhfvPCeVy-UgARyabFulxtbb7kBdQ'

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    console.log("////////////////////Tetsting url",url)
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const res = response.data;
console.log("////////////////////Tetsting res",res)
    return res;
}

export function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}