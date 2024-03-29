import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: '',
        authority: 'https://login.microsoftonline.com/b8fb8be4-f50e-4989-96c3-41eb135ec147',
        redirectUri: 'https://shikhar3rd.d3sqfb6vimwvo.amplifyapp.com/', // Redirect URI configured in Azure AD
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }
    }
    
};
