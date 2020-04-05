import * as Facebook from 'expo-facebook';


export default {
    
    initFacebookApi: (appId, appName) => {
        return Facebook.initializeAsync(appId, appName);
    },
    
    loginWithPermissions: (permissions) => {
        return Facebook.logInWithReadPermissionsAsync(permissions);
    },
}