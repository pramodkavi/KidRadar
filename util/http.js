import axios from 'axios';
import {StackActions as cases} from "@react-navigation/routers/src";

const BACKEND_URL =
    'https://kidradar-580da-default-rtdb.firebaseio.com';

const API = "http://127.0.0.1:8080";

export async function storeCases(casesData) {
  let id =""
  try {
    const response = await axios.post(API+'/childcases', casesData);
    // id = response.data.name;
    id = response.data.id;
  }catch (err){
    console.log("Here is error",err)
  }
  return id;
}

export async function fetchCases() {
  const uid = "pIvQlCCo0kWrIxYIouvx38romT63";
  const res = await axios.get(API+`/childcases/${uid}`,uid);

  const response = JSON.parse(res.request._response);
  // const childDataArray = responseData.d;

  // const response = await axios.get(BACKEND_URL + '/cases.json');

  const cases = [];

  for (const key in response.data) {
    const casesObj = {
      id: response.data[key]._id,
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
  return axios.put(API+`/childcases/${id}`, caseData);
}

export function deleteCase(id) {
  return axios.delete(API+`/childcases/${id}`,id);
}
/////////////////////////////////////////////////////////////////////////////////

export async function storePreSchoolCasesCount(casesCountData) {
  let id =""
  try {
    const response = await axios.post(API + '/preSchoolCasesCount', casesCountData);
    id = response.data.id;
  }catch (err){
    console.log("Here is error",err)
  }

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
  let id =""
  try {
    const response = await axios.post(API + '/preSchoolCases', casesData);
    // id = response.data.name;
    id = response.data.id;
  }catch (err){
    console.log("Here is error",err)
  }
  return id;
}

export async function fetchPreSchoolCases() {
  const uid = "pIvQlCCo0kWrIxYIouvx38romT63";
  const res = await axios.get(API+`/preSchoolCases/${uid}`,uid);

  const response = JSON.parse(res.request._response);
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
  return axios.put(API + `/preSchoolCases/${id}`, casesData);
}

export function deletePreSchoolCases(id) {
  return axios.delete(API + `/preSchoolCases/${id}`,id);
}

/////////////////////////////////////////////////////////////////////////////////

export async function storeSchool(schoolData) {
  console.log("//////////////////////Here is school data",schoolData)
  const response = await axios.post(API + '/schools', schoolData);
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
  console.log("//////////////////////////////preSchoolData", schoolData)
  let id =""
  try {
    const response = await axios.post(API + '/preSchools', schoolData);
    id = response.data.id;
  }catch (err){
    console.log("Here is error",err)
  }
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

/////////////////////////////////////////////////////////////////////////////////

export async function storeInstitute(instituteData) {
  console.log("//////////////////////Here is instituteData",instituteData)
  let id =""
  try {
    const response = await axios.post(API + '/institutes', instituteData);
    id = response.data.id;
  }catch (err){
    console.log("Here is error",err)
  }
  return id;
}

export async function fetchInstitute() {
  const uid = "pIvQlCCo0kWrIxYIouvx38romT63";
  const res = await axios.get(API+`/institutes/${uid}`,uid);
  const response = JSON.parse(res.request._response);
  const institutes = [];

  for (const key in response.data) {
    const institute = {
      id: response.data[key]._id,
      name: response.data[key].name,
      detailedName: response.data[key].detailedName,
      email: response.data[key].email,
      maxNVQ: response.data[key].maxNVQ,
      description: response.data[key].description,
      address: response.data[key].address,
      contactNo: response.data[key].contactNo,
    };
    institutes.push(institute);
  }
  return institutes;
}

export function updateInstitut(id, instituteData) {
  return axios.put(API + `/institutes/${id}`, instituteData);
}

export function deleteInstitute(id) {
  return axios.delete(BACKEND_URL + `/schools/${id}.json`,id);
}

/////////////////////////////////////////////////////////////////////////////////

export async function storeCourses(courseData) {
  console.log("///////////////////////// courseData in http",courseData)
  let id =""
  try {
    const response = await axios.post(API+'/courses', courseData);
    id = response.data.id;
  }catch (err){
    console.log("Storing error",err)
  }
  return id;
}

export async function fetchCourses(instituteId) {
  // const instituteId = "pIvQlCCo0kWrIxYIouvx38romT63";
  const res = await axios.get(API+`/courses/${instituteId}`,instituteId);
  const response = JSON.parse(res.request._response);


  const courses = [];

  for (const key in response.data) {
    const courseObj = {
      id: response.data[key]._id,
      name: response.data[key].name,
      type: response.data[key].type,
      maxNVQ: response.data[key].maxNVQ,
      description:response.data[key].description
    };
    courses.push(courseObj);
  }

  return courses;
}

export function updateCourse(id, courseData) {
  return axios.put(API+`/courses/${id}`, courseData);
}

export function deleteCourse(id) {
  return axios.delete(API+`/courses/${id}`,id);
}