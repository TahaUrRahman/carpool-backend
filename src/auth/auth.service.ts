import { Controller, Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    login(){
        return {msg: 'I am loggedIn'}

    }
    signUp(){
        return {msg: 'I am signedUp'}

    }

}