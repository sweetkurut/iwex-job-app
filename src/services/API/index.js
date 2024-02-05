



import axios from "axios";

const instance = axios.create({
    // baseURL: "http://146.190.135.114:8005",
    baseURL: "https://crm.iwex.kg",
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// интерцептор для токена
// instance.interceptors.request.use(async (config) => {
//   try {
//     const token = await getData('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   } catch (error) {
//     console.error('Ошибка при получении токена:', error);
//     return config;
//   }
// });

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
        return instance.post(`/core/branch/`, data)
    },

    getCity(value) {
        return instance.get(`/core/city/?search=${value}`);
    },
    sendPositionEmployee(data) {
        return instance.post(`/core/positionemployee/`, data);
    },
    deletePositionEmployee(id) {
        return instance.delete(`/core/positionemployee-delete/${id}/`);
    },
    getPositionEmployee() {
        return instance.get(`/core/positionemployee/`);
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
    // /accounts/profile-detail/{id}/

    getEmployeeFilter(id) {
        return instance.get(`/accounts/profiles-list-filter/${id}/`);
    }
}



export default allAPIs;