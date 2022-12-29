import React ,{useState}from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import otp from './OTP.js';

const Login =()=>
{
    const [initialValue,setInit]=useState({Phone : '',Password :''})
    const navigate = useNavigate();
      
    const Validation = Yup.object(
        {
            Phone: Yup.number()
                .typeError("That doesn't look like a phone number")
                .positive("A phone number can't start with a minus")
                .integer("A phone number can't include a decimal point")
                .min(8)
                .required('A phone number is required')
        }
    )
    const Submit = (value,e)=>
    {   var element2;
        axios.post(`/${value.Phone}`).then(async (res)=>
        {
            document.getElementById('re').innerHTML="<div id='sign-in-button'></div>"
            if(res.data.length>0)
            {
                if(res.data[0].Password===value.Password)
                {
                    var oTp = await otp(value.Phone,'invisible')
                    if (oTp === 'Not Yet')
                    {
                        element2 = document.getElementById('Reg')
                        element2.style.display='none'
                        element2 = document.getElementById('Error')
                        element2.style.display='none'
                        element2 = document.getElementById('Limit')
                        element2.style.display=''
                    }
                    else
                    {
                        
                    window.tog = 1
                    window.otp = 1
                    navigate('/otp')
                }  
                }
                else
                {
                    element2 = document.getElementById('Error')
                    element2.style.display=''
                    element2 = document.getElementById('Reg')
                    element2.style.display='none'
                    element2 = document.getElementById('Limit')
                    element2.style.display='none'
                }
            }
            if(res.data.length===0)
            {
                
                element2 = document.getElementById('Reg')
                element2.style.display=''
                element2 = document.getElementById('Error')
                element2.style.display='none'
                element2 = document.getElementById('Limit')
                element2.style.display='none'
            }
        })
        e({value:''})
    }
    return (
        <div>
            <Formik initialValues={initialValue} onSubmit={(value,{resetForm})=>Submit(value,resetForm)} validationSchema={Validation}>
                <Form >
                    <div className='FORM'>
                        <div>
                            <label><b>Phone</b></label><br/>
                            <Field className='Field' type="text" name="Phone" placeholder="Type here...."/>
                            <ErrorMessage name='Phone'></ErrorMessage>
                        </div>
                        <div>
                            <label><b>password</b></label><br/>
                            <Field className='Field' type="password" name="Password" placeholder="Type here...."/>
                            <span id='Error' style={{display:'none'}}>Wrong Password</span>  
                        </div>
                        <div>
                            <button className='button-85' type="submit">Submit</button>
                        </div>
                        
                    </div>
                </Form>
            </Formik>
            <div id='re'>
                <div id='sign-in-button' style = {{display:''}}></div>
                </div>
            <div id='Reg' style={{display:'none'}}>Register First Click on <Link to='/reg'>Register Button</Link></div>   
            <div id='Limit' style={{display:'none'}}>OTP Limit exceeded</div>   
        </div>
    )
}

export default Login;