import firebase from "./fire";


class LoginUtils{

    isUserLoggedIn(){
        console.log("HElllllllllllllllll")
        var user = firebase.auth().currentUser;

        console.log(user)

        if (user) {
            // User is signed in.
            return true;
        } else {
            // No user is signed in.
            return false;
        }
    }

}


export default LoginUtils


