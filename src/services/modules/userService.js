import { OctokitInstance } from '../api/octokit';

class UserService {

    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    async getUsers(payload) {
        try {
            const response = await this.apiInstance.request('GET /search/users', payload);
            return [null, response];
        } catch (error) {
            return [error];
        }
    }

    async getUserDetails(username) {
        try {
            const response = await this.apiInstance.request('GET /users/{username}', {
                username,
            });
            return [null, response];
        } catch(error) {
            return [error];
        }
    }
}

export const userService = new UserService(OctokitInstance);
