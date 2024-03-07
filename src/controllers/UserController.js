import { fakeUsers, userTemplate } from "../models/UserModel";

export class UserController {
  constructor() {
    this.users = fakeUsers;
    this.newUser = userTemplate;
  }

  addNewUser() {
    if (this.newUser.username && this.newUser.role) {
      this.users = [...this.users, this.newUser];
      this.newUser = { ...userTemplate };
    } else {
      alert("Please fill in all fields.");
    }
  }

  handleUserChange(e, pageUserIndex, currentPage) {
    const { name, value, checked, type } = e.target;
    const actualIndex = (currentPage - 1) * PAGE_SIZE + pageUserIndex;
    this.users = this.users.map((user, idx) => (idx === actualIndex ? { ...user, [name]: type === "checkbox" ? checked : value } : user));
  }

  handleDeleteUser(index, currentPage) {
    const updatedUsers = this.users.filter((_, idx) => idx !== index);
    this.users = updatedUsers;
  }
}
