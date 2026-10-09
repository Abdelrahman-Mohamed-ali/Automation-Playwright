import { expect,request,APIRequestContext } from "@playwright/test";


const BaseUrl= "https://rahulshettyacademy.com/"


type LoginCredentials = {
    userEmail: string;
    userPassword: string;
};

export class AuthApi {
    private constructor(private readonly ApiContext:APIRequestContext)
    {

    }
    static async create() : Promise<AuthApi>
    {
     const ApiContext= await request.newContext({
        baseURL : BaseUrl
     })
     return new AuthApi(ApiContext);
    }


    async login(credentials: LoginCredentials) : Promise<string>
{
    const response = await this.ApiContext.post("/api/ecom/auth/login", {
        data : {
           
            userEmail: credentials.userEmail,
            userPassword: credentials.userPassword
        }
    })
    expect(response.ok(), `Login Failed for ${credentials.userEmail}`).toBeTruthy();
    
    const responsejson = await response.json()

    expect(responsejson.token, "Login response missing token").toBeTruthy();

    return responsejson.token as string
}

 async dispose() : Promise<void>{

    await this.ApiContext.dispose()
 }
}