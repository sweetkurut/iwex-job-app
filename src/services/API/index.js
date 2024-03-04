import axios from "axios";
import { getCookie } from "../../utils/js_cookie";

const instance = axios.create({
  // baseURL: "http://10.137.60.119:8001",
  baseURL: "http://192.168.0.90:8000",
  // baseURL: "https://crm.iwex.kg",
  // baseURL: "http://146.190.135.114:8002",

  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Добавляем interceptor для запросов
instance.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const allAPIs = {
  // authorizantion || registration
  signIn(userData) {
    return instance.post("/accounts/signin/", userData);
  },
  signUp(userData) {
    return instance.post("/accounts/signup/", userData);
  },
  verify_email(data) {
    return instance.post("/accounts/verify-email/", data);
  },
  enter_password(data) {
    return instance.post("/accounts/set-password/", data);
  },
  reset_password(data) {
    return instance.post("/accounts/reset-password/", data);
  },

  getDataProfile() {
    return instance.get(`/core/employer-profile/`);
  },

  sendToken(token) {
    return instance.post(`/accounts/token/`, token);
  },

  // =======DataCompany || MyData

  sendCompanyData(data) {
    return instance.post("/core/employercompany/", data);
  },
  getCompanyData(id) {
    return instance.get(`/core/employercompany/`);
  },
  patchCompanyData(data) {
    return instance.patch(`/core/employercompany-update/`, data);
  },

  // branch
  getMyBranch() {
    return instance.get(`/core/branch-list/`);
  },

  getMyBranchDetail(id) {
    return instance.get(`/core/branch-detail/?branch_id=${id}`);
  },
  patchBranchData(id, data) {
    return instance.patch(`/core/branch-update/${id}/`, data);
  },
  sendAddBranch(data) {
    return instance.post(`/core/branch/`, data);
  },

  getCountry() {
    return instance.get(`/core/country/`);
  },

  send_create_vacancy(data) {
    return instance.post(`/core/vacancy-create/`, data);
  },
  getVacancyEmployer() {
    return instance.get(`/core/vacancy-employer/`);
  },

  // DataEmployee || MyData
  sendDataEmployee(data) {
    return instance.post("/accounts/profiles/", data);
  },
  // Vacancy
  getAllVacancy(value) {
    return instance.get(`/core/vacancy-list/?search=${value}`);
  },
  getVacancyDetail(id) {
    return instance.get(`/core/vacancy-detail/${id}/`);
  },
  editVacancy(id, data) {
    return instance.patch(`/core/vacancy-update/${id}/`, data);
  },

  // Student
  getAllEmployee() {
    return instance.get(`/accounts/profile-list/`);
  },
  getEmployeeDetail(id) {
    console.log(id);
    return instance.get(`/accounts/profile-detail/${id}/`);
  },
  sendInvitation(data) {
    return instance.post(`/core/invitation/`, data);
  },
  getInvitation() {
    return instance.get(`/core/invitation/`);
  },
  sendInterviews(id) {
    return instance.post(`/core/interviews-create/`, id);
  },
  // /accounts/profile-detail/{id}/

  getEmployeeFilter(id) {
    return instance.get(`/accounts/profiles-list-filter/${id}/`);
  },

  // favarite students
  getFavariteStudent() {
    return instance.get("/core/favorite-list/");
  },
  sendFavorite(id) {
    return instance.post(`/core/favorite-create/`, id);
  },

  // interview-list
  getInterView() {
    return instance.get("/core/interviews-list/");
  },



  sendHousinng(data) {
    return instance.post('/core/housing/', data)
  },
  getHousing() {
    return instance.get('/core/housing-list/')
  }
};

export default allAPIs;
