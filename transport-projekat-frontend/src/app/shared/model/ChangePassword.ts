export class ChangePassword {
  old_password: string;
  new_password: string;

  constructor(oldPassword: string, newPassword: string) {
    this.old_password = oldPassword;
    this.new_password = newPassword;
  }

}
