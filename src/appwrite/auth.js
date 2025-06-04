 import { Client, Account, ID } from "appwrite";
 import {appwriteUrl, appwriteProjectId} from "../conf.js"

 export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);
            this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount) {
                // call another method
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            // throw error;
            console.log(error)
        }
    }

    async login({email, password}){

        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            // throw error;
            console.log(error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwriter current user: " + error)   
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service:: logout :: "+ error)
        }
    }
 }

 const authService = new AuthService()

export default  authService