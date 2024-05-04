import axios from 'axios';

const API_KEY = 'AIzaSyDG5wSTCQHr8CWPWAWie5yq6Y9Pu1Vy5BA'


async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    const res = response.data;
    return res;
}

export function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}