import createApiClient from "./api.service";

class AuthService {
  constructor(baseURL = "/api/v1/users") {
    this.api = createApiClient(baseURL);
  }

  async register(data) {
    return await (
      await this.api.post("/register", data)
    ).data;
  }

  async login(data) {
    return await (
      await this.api.post("/login", data)
    ).data;
  }

  async searchUsers(keyword) {
    return await (
      await this.api.get(`/?search=${keyword}`)
    ).data;
  }

  async logout() {
    return await (
      await this.api.post("/logout")
    ).data;
  }

  async deleteAccount(userId) {
    return await (
      await this.api.delete(`/${userId}`)
    ).data;
  }

  async editAccount(userId, image) {
    return await (
      await this.api.put(`/${userId}`, image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    ).data;
  }

  async sendVerifyCode(data) {
    return await (await this.api.post(`/verify-code`, data)).data;
  }

  async resetPassword(data) {
    return await (await this.api.patch(`/reset-password`, data)).data;
  }

  async getUserInfo() {
    return await (await this.api.get('/me')).data;
  }
}

export default new AuthService();