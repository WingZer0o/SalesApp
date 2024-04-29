export class LoginResponseDto {
    jwt: string;

    constructor(jwt: string) {
        this.jwt = jwt;
    }
}