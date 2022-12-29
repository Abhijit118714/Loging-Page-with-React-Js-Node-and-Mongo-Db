import { Navigate } from 'react-router-dom';


function Private({children})
{
    if(window.otp === 1)
    {
        return children
    }
    return <Navigate to="/"/>
}

export default Private;