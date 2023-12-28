import {Form , message} from "antd";
import Input from "antd/es/input/Input";
import React ,{useState, useEffect}from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import Spinner from '../component/spinner'
import "../resources/authentication.css";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async(values) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/users/register`, values);
      message.success("Registered Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong",error)
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("expense-tracker-user"))
      navigate("/")
  },[navigate]);

  const validateName = (_, value) => {
    return value.length >= 4 ? Promise.resolve() : Promise.reject(new Error("Name need minimum of 4 characters"))
  }

  const validatePassword = (_, value)=> {
    const validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return validationRegex.test(value) ? Promise.resolve() : Promise.reject(new Error("Password does not matches the criteria"))
  }

  return (
    <div className='register'>
     {loading && <Spinner/>}
     <div className="row justify-content-center align-items-center w-100 h-100">
      <div className="col-md-4">
        <Form layout="vertical" onFinish={onFinish}>
          <h1>Register</h1>

          <Form.Item label="Name" name="name" rules={[{message: "Name should have minimum 4 characters!" ,validator: validateName, required: true}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{message: "Email should be valid!" ,type: "email", required: true}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{message: "Password must contain at least 8 characters, includes 1 number, 1 lowercase and uppercase letters and 1 special character" ,validator: validatePassword, required: true}]}>
            <Input type= "password"/>
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center">
              <Link to="/login" className="linkTo">
                Already Registered? Click Here To Login
              </Link>
              <button className="btn btn-outline-light" type="submit">
                REGISTER
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

export default Register
