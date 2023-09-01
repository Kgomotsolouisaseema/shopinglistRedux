import React, { useState } from "react";
import { auth ,googleProvider } from "./firebase";
import { createUserWithEmailAndPassword , signInWithPopup  ,signOut} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.photoURL);


  const signing = async () => {
    try{
    await createUserWithEmailAndPassword(auth, email, password);
    }catch(error){
      console.error("Error" , error)
    }
  }; // signing end bracket 

  const signinwithgoogle = async() => {
    try{
      await  signInWithPopup(auth, googleProvider);
      }catch(error){
        console.error("Error signing in with Google" , error)
      }

  };//google end bracket

  const logout = async() => {
    try{
      await  signOut(auth);
      }catch(error){
        console.error("Error signing in with Google" , error)
      }

  };//google end bracket
  
  return (
    <div>
      <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password.."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signing}> Sign In </button>
      <button onClick={signinwithgoogle}> Sign In with Google </button>
      <button onClick={logout}>Log out </button>

    </div>
  );
};

export default SignIn;
