import initializeAuthentication from "../Firebase/Firebase.init"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";

initializeAuthentication();



const useFirebase = () => {
     const [user, setUser] = useState({})
     const [isLoading, setIsLoading] = useState(true);

     const auth = getAuth();
     const googleProvider = new GoogleAuthProvider();
     // Google sign in
     const signInUsingGoogle = () => {
          return signInWithPopup(auth, googleProvider)
               .finally(() => { setIsLoading(false) });

     }
     // sign out
     const logOut = () => {
          signOut(auth)
               .then(() => {
                    setUser({})
               })
               .finally(() => setIsLoading(false))

     }

     // observae state
     useEffect(() => {
          const unsubscribed = onAuthStateChanged(auth, (user) => {
               if (user) {
                    getIdToken(user)
                         .then(idToken => localStorage.setItem('idToken', idToken))
                    setUser(user)
               }
               else {
                    setUser({});
               }
               setIsLoading(false);

          });
          return () => unsubscribed;
     }, [])

     // return all valur 
     return {
          user,
          signInUsingGoogle,
          logOut, isLoading
     }

}

export default useFirebase;


