import React ,{useState}from 'react';
import otp_send from "./OTP.js";
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function App() 
{   

    let navigate = useNavigate();
    const [initialValue]=useState({Phone : '',Password :'',Conform_Password:''})
    function Submit(value,e)
    {
        delete value['Conform_Password']
        window.value = value
        console.log(value)
        axios.post(`/${value.Phone}`).then(async (res)=>{
            if(res.data.length===0)
            {   
                let a = await otp_send(value.Phone,'invisible')
                console.log(a)
                window.tog = 2
                if(a === 'Not Yet')
                {
                    var element2=document.getElementById('Data_Is_There');
                    element2.style.display='none'
                    // element2=document.getElementById('sign-in-button');
                    // element2.style.display='none'
                    element2=document.getElementById('Limit');
                    element2.style.display=''
                }
                else{
                window.otp = 1
                navigate('/otp')}

            }
            else{
                var element1=document.getElementById('Data_Is_There');
                element1.style.display=''
                // element2=document.getElementById('sign-in-button');
                // element2.style.display='none'
                element2=document.getElementById('Limit');
                element2.style.display='none'
        }})
        
        
        //e({value:''})
    }
    const Validation = Yup.object(
        {
            Phone: Yup.number()
                .typeError("That doesn't look like a phone number")
                .positive("A phone number can't start with a minus")
                .integer("A phone number can't include a decimal point")
                .min(8)
                .required('A phone number is required'),
            Conform_Password:Yup.string().oneOf([Yup.ref('Password'),null],'Password Must Match')
        }
    )
    return (
      <div className="App">
        
        <Formik initialValues={initialValue} onSubmit={(values,{resetForm})=>Submit(values,resetForm)} validationSchema={Validation}>
        <Form >
            <div className='FORM'>
                <div>
                    <label><b>Phone</b></label><br/>
                    <Field className='Field' type="text" name="Phone" placeholder="Type here...."/>
                    <b><ErrorMessage name='Phone'/></b>
                </div>
                <div>
                    <label ><b>Password</b></label><br/>
                    <Field className='Field' type="password" name="Password" placeholder="Type here...."/>
                </div>
                <div>
                    <label ><b>Conform Password</b></label><br/>
                    <Field className='Field' type="password" name="Conform_Password" placeholder="Type here...."/>
                    <b><ErrorMessage name='Conform_Password'/></b>
                </div>
                <div className='sign-in-button'></div>
                <div>
                    <button className='button-85' type="submit">Submit</button>
                </div>
                
            </div>
        </Form>
    </Formik>
        <div id='Data_Is_There' style = {{display:'none'}}>Data is There. Click on <Link to='/'>Login Page</Link></div>
        <div id='Limit' style={{display:'none'}}>OTP Limit exceeded</div>   
      </div>
    );

    }
export default App;