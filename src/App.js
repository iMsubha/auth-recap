import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
function App() {
  const [user, setUser] = useState({});
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log("gh", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(
          "error",
          errorMessage,
          error.code,
          error.message,
          error.credential
        );
      });
  };
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <br />
      <button onClick={handleFacebookSignIn}>Facebook Sign in</button>
      <br />
      <button onClick={handleGithubSignIn}>Github Sign in</button>
      <h3>User: {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
