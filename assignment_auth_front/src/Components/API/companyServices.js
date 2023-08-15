import api from "./fetchService";

export default class CompanyServices {
    static async ownerOrgList (user_id) {
        return api.post('/owner-org-list', {user_id} )
    }

    static async createOrg (user_id, company) {
        return api.post('/create-org', {user_id, company} )
    }

    // static async logout () {
    //     return api.post('/signout' )
    // }
}