import React ,{useState}from 'react';
import { Formik,Form,Field} from "formik";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import otp from './OTP.js'

function OTP()
{
    const navigate = useNavigate()
    const [initialValue]=useState({otp:''})
    const [sec, setSec] = useState(12);
    const [min, setMin] = useState(0);

    React.useEffect(() => {
        if (sec>0){
        
            var element2 = document.getElementById('count')
            element2.style.display=''
            element2 = document.getElementById('resend')
            element2.style.display='none'
            setTimeout(() => setSec(sec - 1), 1000);
    }
    else if(sec === 0 && min !== 0)
    {
        var element3 = document.getElementById('count')
        element3.style.display=''
        element3 = document.getElementById('resend')
        element3.style.display='none'
        setTimeout(() => setMin(min - 1), 1000);
        setTimeout(() => setSec(59), 1000);

    }
    else if (sec === 0 && min === 0)
    {
        document.getElementById('re').innerHTML="<div id='sign-in-button'></div>"
        var element1 = document.getElementById('count')
        element1.style.display='none'
        element1 = document.getElementById('resend')
        element1.style.display=''
    }
      }, [sec]);
    function Submit(v)
    {   
        window.ver.confirm(v.otp).then((result) => {

            if (window.tog === 2) {
                
                axios.post('/',window.value).then((res)=>{
                navigate('/')
                window.tog = 0
                window.ver = 0
                })
            }
            else if (window.tog === 1){
                navigate('/reg')
                window.tog = 0
                window.ver = 0
            }
            }
        ).catch((err) => {
            window.otp = 1
            navigate('/otp')
        });
    }
    return <div>
        <Formik initialValues={initialValue} onSubmit={(value)=>Submit(value)}>
        <Form >
            <div className='FORM'>
                <div>
                    <label><b>OTP</b></label><br/>
                    <Field className='Field' type="text" name="otp" placeholder="Type here...."/>
                </div>
                <div>
                    <button className='button-85' type="submit">Submit</button>
                </div>
                
            </div>
        </Form>
        </Formik>
        
        <div id='count' style={{display:'none'}}>Resend After: {min}:{sec/10 < 1 ? `0${sec}`:sec }</div>
        <div id='resend' style={{display:'none'}} onClick={async ()=>{
            await otp(window.phone,'invisible');
            setSec(59)
            var element3 = document.getElementById('count')
            element3.style.display=''
            element3 = document.getElementById('resend')
            element3.style.display='none'
        }}>Resend otp</div>
        
        <div id='re'>
                <div id='sign-in-button' style = {{display:''}}></div>
        </div>
    </div>
}
export default OTP;