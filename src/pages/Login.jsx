import React , {useEffect, useState}from 'react'
import {Link, useNavigate} from "react-router-dom"
import Spinner from '../component/spinner'
import axios from "axios"
import Input from 'antd/es/input/Input'
import { Form, message } from 'antd'
import "../resources/authentication.css";
import API_URL from '../api'
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async(values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/users/login`, values);
      localStorage.setItem(
        "expense-tracker-user",
        JSON.stringify({...response.data, password: ""})
      );
      setLoading(false);
      message.success("Login Successfull");
      navigate("/");

    } catch (error) {
      setLoading(false);
      message.error("Login Failed");
    }
  }
  
  useEffect(() =>{
    if(localStorage.getItem("expense-tracker-user"))
      navigate("/");
  }, [navigate]);

  return (
    <div className='register'>
     {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout='vertical' onFinish={onFinish}>
          <h1>Login</h1>

          <Form.Item label= 'Email' name="email" rules={[{message: "Please enter your email"}]}>
            <Input/>
          </Form.Item>
          <Form.Item label= 'Password' name="password" rules={[{message: "Please enter your password"}]}>
            <Input type='password'/>
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center">
              <Link to="/register" className="linkTo">
                Not Registered Yet , Click Here To Register
              </Link>
              <button className="btn btn-outline-light" type="submit">
                LOGIN
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
         <lottie-player
           src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
           background="transparent"
           speed="1"
           loop
           autoplay  
         ></lottie-player>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Login
