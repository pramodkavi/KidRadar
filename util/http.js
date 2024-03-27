import axios from 'axios';
import {StackActions as cases} from "@react-navigation/routers/src";

const BACKEND_URL =
    'https://kidradar-580da-default-rtdb.firebaseio.com';

export async function storeCases(casesData) {
  const response = await axios.post(BACKEND_URL + '/cases.json', casesData);
  const id = response.data.name;
  return id;
}

export async function fetchCases() {
  const response = await axios.get(BACKEND_URL + '/cases.json');

  const cases = [];

  for (const key in response.data) {
    const casesObj = {
      id: key,
      name: response.data[key].name,
      age: response.data[key].age,
      address: response.data[key].address,
      contactNo: response.data[key].contactNo,
      date: new Date(response.data[key].date),
      reason: response.data[key].reason,
      division: response.data[key].division,
      school: response.data[key].school,
      caseType: response.data[key].caseType,
    };
    cases.push(casesObj);
  }

  return cases;
}

export function updateCase(id, caseData) {
  return axios.put(BACKEND_URL + `/cases/${id}.json`, caseData);
}

export function deleteCase(id) {
  return axios.delete(BACKEND_URL + `/cases/${id}.json`,id);
}
/////////////////////////////////////////////////////////////////////////////////

export async function storePreSchoolCasesCount(casesCountData) {
  const response = await axios.post(BACKEND_URL + '/preSchoolCasesCount.json', casesCountData);
  const id = response.data.name;
  return id;
}

export async function fetchPreSchoolCasesCount() {
  const response = await axios.get(BACKEND_URL + '/preSchoolCasesCount.json');
  const preCasesCount = [];

  for (const key in response.data) {
    const casesObj = {
      id: key,
      description: response.data[key].description,
      graduatesCounts: response.data[key].graduatesCounts,
      scholarsCounts: response.data[key].scholarsCounts,
      division: response.data[key].division,
      preSchool: response.data[key].preSchool,
    };
    preCasesCount.push(casesObj);
  }
  return preCasesCount;
}

export function updatePreSchoolCasesCount(id, casesCountData) {
  return axios.put(BACKEND_URL + `/preSchoolCasesCount/${id}.json`, casesCountData);
}

export function deletePreSchoolCasesCount(id) {
  return axios.delete(BACKEND_URL + `/preSchoolCasesCount/${id}.json`,id);
}
///////////////////////////////////////////////////////////////////////////////////////////////

export async function storePreSchoolCases(casesData) {
  const response = await axios.post(BACKEND_URL + '/preSchoolCases.json', casesData);
  const id = response.data.name;
  return id;
}

export async function fetchPreSchoolCases() {
  const response = await axios.get(BACKEND_URL + '/preSchoolCases.json');
  const cases = [];

  for (const key in response.data) {
    const casesObj = {
      id: key,
      name: response.data[key].name,
      age: response.data[key].age,
      address: response.data[key].address,
      contactNo: response.data[key].contactNo,
      date: new Date(response.data[key].date),
      division: response.data[key].division,
      preSchool: response.data[key].preSchool,
    };
    cases.push(casesObj);
  }

  return cases;
}

export function updatePreSchoolCases(id, casesData) {
  return axios.put(BACKEND_URL + `/preSchoolCases/${id}.json`, casesData);
}

export function deletePreSchoolCases(id) {
  return axios.delete(BACKEND_URL + `/preSchoolCases/${id}.json`,id);
}

/////////////////////////////////////////////////////////////////////////////////

export async function storeSchool(schoolData) {
  const response = await axios.post(BACKEND_URL + '/schools.json', schoolData);
  const id = response.data.name;
  return id;
}

export async function fetchSchools() {
  const response = await axios.get(BACKEND_URL + '/schools.json');

  const schools = [];

  for (const key in response.data) {
    const school = {
      id: key,
      school: response.data[key].school,
      description: response.data[key].description,
      address: response.data[key].address,
      contactNo: response.data[key].contactNo,
      date: new Date(response.data[key].date),
      division: response.data[key].division,
    };
    schools.push(school);
  }

  return schools;
}

export function updateSchool(id, schoolData) {
  return axios.put(BACKEND_URL + `/schools/${id}.json`, schoolData);
}

export function deleteSchool(id) {
  return axios.delete(BACKEND_URL + `/schools/${id}.json`,id);
}

/////////////////////////////////////////////////////////////////////////////////

export async function storePreSchool(schoolData) {
  const response = await axios.post(BACKEND_URL + '/preSchools.json', schoolData);
  const id = response.data.name;
  return id;
}

export async function fetchPreSchools() {
  const response = await axios.get(BACKEND_URL + '/preSchools.json');

  const preSchools = [];

  for (const key in response.data) {
    const preSchool = {
      id: key,
      preSchool: response.data[key].preSchool,
      description: response.data[key].description,
      address: response.data[key].address,
      contactNo: response.data[key].contactNo,
      date: new Date(response.data[key].date),
      division: response.data[key].division,
    };
    preSchools.push(preSchool);
  }

  return preSchools;
}

export function updatePreSchool(id, schoolData) {
  return axios.put(BACKEND_URL + `/preSchools/${id}.json`, schoolData);
}

export function deletePreSchool(id) {
  return axios.delete(BACKEND_URL + `/preSchools/${id}.json`,id);
}