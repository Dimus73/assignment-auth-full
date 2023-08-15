import api from "./fetchService";

export default class AddUserServices {
    static async companyUserList (company_id) {
        return api.post('/users-in-org', {company_id} )
    }
    static async allUserList (company_id) {
        return api.get('/users')
    }


    static async addUserToCompany (user_id, company_id) {
        return api.post('/add-user-to-org', {user_id, company_id} )
    }

}