import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      // make the API call
      const response = {
        data: {
          success: true,
          message: "Login Successful",
          data: `${values.email}`
        }
      }
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Login</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            Register
          </Link>
         
        </Form>
      </div>
    </div>
  );
}

export default Login;