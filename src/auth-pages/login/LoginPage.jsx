import Notification from '../../components/Notification';
import LoginDialogue from '../user/Login';
import Login from '../user/Login';
import './Login.scss'

const LoginPage  = () => {
    return(
        <div className="login-frame">
            {/* This is the login page */}
            <Login close={false} open={true} register={false}  />
            <Notification/>
        </div>
    )
}

export default LoginPage;