export class User {

    id : number;
    username : string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(id: number, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = password;
    }

    public getId() : number {
        return this.id;
    }

    public getUsername() : string {
        return this.username;
    }

    public setUsername(username: string) : void {
        this.username = username;
    }

    public getEmail() : string {
        return this.email;
    }

    public setEmail(email: string) : void {
        this.email = email;
    }

    public getPassword() : string {
        return this.password;
    }

    public setPassword(password: string) : void {
        this.password = password;
    }

    public getConfirmPassword() : string {
        return this.confirmPassword;
    }
}
