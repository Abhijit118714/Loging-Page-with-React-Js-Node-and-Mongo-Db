import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import OTP from './OTP_SEND.js'

const firebaseConfig = {
  apiKey: "AIzaSyCwxCYAZ1EIg-gtMJqbFsNGIGY0jboAjbI",
  authDomain: "ne123-ff49e.firebaseapp.com",
  projectId: "ne123-ff49e",
  storageBucket: "ne123-ff49e.appspot.com",
  messagingSenderId: "127077220920",
  appId: "1:127077220920:web:ffb48720cfbbba3c4f9ccd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function capture(value)
{   
    
    window.ver = new RecaptchaVerifier('sign-in-button', {
        'size': value
    }, auth)

} 
function Otp_send(ph,value)
{
  capture(value)
  return new Promise (async (res,rej)=>{
    window.phone = ph
    signInWithPhoneNumber(auth,`+91${ph}`,window.ver).then(
    (i)=>{
        window.ver = i
        res('Yes')
  }
  ).catch((err)=>{
    res('Not Yet')})
})
}

export default Otp_send;
