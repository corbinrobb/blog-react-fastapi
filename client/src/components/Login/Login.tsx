import React, { FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputProps } from "../Common/Input";
import LoginModal from "./LoginModal";
import { useAuth } from "../Auth/AuthContext";
import Form, { formErrorType } from "../Common/Form";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<formErrorType>({ detail: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError({
        detail: "Please provide username and password",
      });
      return;
    }
    setLoading(true);

    const handleData = () => {
      const from = location.state?.from?.pathname || "/home";
      setLoading(false);
      navigate(from, { replace: true });
    };
    const handleError = (error: formErrorType) => {
      if (error.detail) {
        setError({
          detail: error.detail,
        });
      }
      setLoading(false);
    };
    auth.signin({ username, password }, handleData, handleError);
  };

  const inputs: InputProps[] = [
    {
      title: "username",
      inputState: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      title: "password",
      inputState: password,
      onChange: (e) => setPassword(e.target.value),
      type: "password",
    },
  ];

  return (
    <div className="flex items-center flex-col p-6 justify-center">
      <Form
        onSubmit={onSubmit}
        inputs={inputs}
        loading={loading}
        button={{ value: "enter" }}
        error={error}
      />
      <span
        className="mt-4 text-green-500 hover:text-green-800 cursor-pointer"
        onClick={() => setModalVisible(true)}
      >
        Need help?
      </span>
      <LoginModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Login;
