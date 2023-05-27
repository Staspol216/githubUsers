import { OctokitInstance } from '../api/octokit';

class UserService {

    constructor(apiInstance) {
        this.api = apiInstance;
    }

    async getUsers(query) {
        try {
            const { data } = await this.api.request('GET /search/users', {
                q: query
            });
            return [null, data];
        } catch (error) {
            console.error(error);
            return [error];
        }
    }

}

export const userService = new UserService(OctokitInstance);
