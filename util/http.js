import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const API = "http://192.168.8.113:8090";

function getUid() {
  const authCtx = useContext(AuthContext);
  const uId = authCtx.uId;
  return uId;
}

export async function storeUser(userData) {
  let id = "";
  try {
    const response = await axios.post(API + "/user", userData);

    id = response.data.id;
  } catch (err) {
    console.log("Here is error", err);
  }
  console.log("///////////////////// userdata", userData);
  return id;
}
export async function fetchUser(uId) {
  console.log("///////////////////// I am here fetched user", uId);

  const uid = uId;
  const res = await axios.get(API + `/user/${uid}`, uid);

  const response = JSON.parse(res.request._response);
  // const childDataArray = responseData.d;

  // const response = await axios.get(BACKEND_URL + '/cases.json');

  const user = [];

  for (const key in response.data) {
    const userObj = {
      id: response.data[key]._id,
      name: response.data[key].name,
      email: response.data[key].email,
      phoneNumber: response.data[key].phoneNumber,
      role: response.data[key].role,
      uId: response.data[key].uId,
      designation: response.data[key].designation,
    };

    user.push(userObj);
  }

  return user;
}
export async function updateUsers(id, caseData) {
  return axios.put(API + `/user/${id}`, caseData);
}

export async function storeCases(casesData) {
  let id = "";
  try {
    const response = await axios.post(API + "/childcases", casesData);
    // id = response.data.name;
    id = response.data.id;
  } catch (err) {
    console.error(err);
  }
  return id;
}

export async function fetchCases(uId) {
  const uid = uId;
  const res = await axios.get(API + `/childcases/${uid}`, uid);

  const response = JSON.parse(res.request._response);
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
      location: response.data[key].location,
      institute: response.data[key].institute,
    };

    cases.push(casesObj);
  }

  return cases;
}

export function updateCase(id, caseData) {
  return axios.put(API + `/childcases/${id}`, caseData);
}

export function deleteCase(id) {
  return axios.delete(API + `/childcases/${id}`, id);
}

export async function storePreSchoolCasesCount(casesCountData) {
  let id = "";
  try {
    const response = await axios.post(
      API + "/preSchoolCasesCount",
      casesCountData
    );
    id = response.data.id;
  } catch (err) {
    console.error(err);
  }

  return id;
}

export async function fetchPreSchoolCasesCount(uId) {
  const uid = uId;
  const res = await axios.get(API + `/preSchoolCasesCount/${uid}`, uid);
  const response = JSON.parse(res.request._response);

  const preCasesCount = [];

  for (const key in response.data) {
    const casesObj = {
      id: response.data[key]._id,
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

export async function storePreSchoolCases(casesData) {
  let id = "";
  try {
    const response = await axios.post(API + "/preSchoolCases", casesData);
    id = response.data.id;
  } catch (err) {
    console.error(err);
  }
  return id;
}

export async function fetchPreSchoolCases(uId) {
  const uid = uId;
  const res = await axios.get(API + `/preSchoolCases/${uid}`, uid);

  const response = JSON.parse(res.request._response);
  const cases = [];

  for (const key in response.data) {
    const casesObj = {
      id: response.data[key]._id,
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
  return axios.delete(API + `/preSchoolCases/${id}`, id);
}

export async function storeSchool(schoolData) {
  let id = "";
  try {
    const response = await axios.post(API + "/schools", schoolData);
    // id = response.data.name;
    const id = response.data.name;
  } catch (err) {
    console.error(err);
  }
  return id;
}

export async function fetchSchools(uId) {
  const uid = uId;
  const res = await axios.get(API + `/schools/${uid}`, uid);

  const response = JSON.parse(res.request._response);
  const schools = [];

  for (const key in response.data) {
    const school = {
      id: response.data[key]._id,
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

export function updateSchools(id, schoolData) {
  return axios.put(API + `/schools/${id}`, schoolData);
}

export function deleteSchools(id) {
  return axios.delete(API + `/schools/${id}`, id);
}

export async function storePreSchool(schoolData) {
  let id = "";

  try {
    const response = await axios.post(API + "/preSchools", schoolData);
    id = response.data.id;
  } catch (err) {
    console.error(err);
  }
  return id;
}

export async function fetchPreSchools(uId) {
  const uid = uId;
  const res = await axios.get(API + `/preSchools/${uid}`, uid);
  const response = JSON.parse(res.request._response);

  const preSchools = [];

  for (const key in response.data) {
    const preSchool = {
      id: response.data[key]._id,
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

export function updatePreschool(id, preschoolData) {
  return axios.put(API + `/preSchools/${id}`, preschoolData);
}

export function deletePreSchool(id) {
  return axios.delete(API + `/preSchools/${id}`, id);
}

export async function storeInstitute(instituteData) {
  let id = "";
  try {
    const response = await axios.post(API + "/institutes", instituteData);
    id = response.data.id;
  } catch (err) {
    console.error(err);
  }
  return id;
}

export async function fetchInstitute(uId) {
  const uid = uId;
  let res = null;
  try {
    res = await axios.get(API + `/institutes/${uid}`, uid);
  } catch (err) {
    console.error(err);
  }

  const response = res.data;
  const institutes = [];

  for (const key in response.data) {
    const institute = {
      id: response.data[key]._id,
      name: response.data[key].name,
      detailedName: response.data[key].detailedName,
      email: response.data[key].email,
      description: response.data[key].description,
      address: response.data[key].address,
      contactNo: response.data[key].contactNo,
      type: response.data[key].type,
      subType: response.data[key].subType,
    };
    institutes.push(institute);
  }
  return institutes;
}

export function updateInstitut(id, instituteData) {
  return axios.put(API + `/institutes/${id}`, instituteData);
}

export function deleteInstitute(id) {
  return axios.delete(API + `/institutes/${id}`, id);
}

export async function storeCourses(courseData) {
  let id = "";
  try {
    const response = await axios.post(API + "/courses", courseData);
    id = response.data.id;
  } catch (err) {
    console.error(err);
  }
  return id;
}

export async function fetchCourses(instituteId) {
  let res = null;
  try {
    res = await axios.get(API + `/courses/${instituteId}`, instituteId);
  } catch (err) {
    console.log("Fetching err", err);
  }
  const response = res.data;

  const courses = [];

  for (const key in response.data) {
    const courseObj = {
      id: response.data[key]._id,
      name: response.data[key].name,
      type: response.data[key].type,
      maxNVQ: response.data[key].maxNVQ,
      description: response.data[key].description,
    };
    courses.push(courseObj);
  }

  return courses;
}

export function updateCourses(id, courseData) {
  return axios.put(API + `/courses/${id}`, courseData);
}

export function deleteCourses(id) {
  return axios.delete(API + `/courses/${id}`, id);
}
