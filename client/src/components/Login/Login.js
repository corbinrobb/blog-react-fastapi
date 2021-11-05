import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Common/Input";
import Modal from "../Common/Modal";
import { easyFetch } from "../../utils/easyFetch";
import { setToken } from "../../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError({
        detail: "Please provide username and password",
      });
      return;
    }
    setLoading(true);
    const formdata = `username=${username}&password=${password}`;
    easyFetch
      .post("http://127.0.0.1:8000/token", formdata, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      })
      .then((data) => {
        console.table(data);
        setToken(data);
        navigate("/home");
      })
      .catch((err) => {
        setPassword("");
        err.then((err) => {
          if (err.detail) {
            setError({
              detail: err.detail,
            });
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginModal = (
    <div
      ref={modalRef}
      className="h-1/3 w-4/5 flex justify-center items-center border rounded-lg bg-green-50 relative text-lg p-3"
    >
      <button
        className="h-10 w-10 bg-white absolute top-0 right-0 rounded-md filter drop-shadow-sm"
        onClick={() => {
          setShowModal(false);
        }}
      >
        X
      </button>
      <p className="text-center text-green-800">
        Uhhh, I didn't actaully think anybody would click this ... So uhh, like,
        how is your day going?
      </p>
    </div>
  );

  return (
    <div className="flex items-center flex-col p-6 justify-center">
      <form
        className="relative border-l border-t border-green-400 border-opacity-40 rounded-lg px-16 py-12 lg:px-32 lg:py-24 flex flex-col items-center justify-center shadow-md"
        onSubmit={onSubmit}
      >
        <Input
          inputState={username}
          title={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          inputState={password}
          title={"password"}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        {error.detail && (
          <span className="bottom-2 border-l border-t border-red-200 lg:bottom-10 bg-yellow-100 py-1 px-2 rounded text-red-700 m2-62 text-sm absolute shadow">
            {error.detail}
          </span>
        )}
        <button className="border p-1 w-24 rounded-md mt-2 bg-green-500 text-white shadow active:bg-green-700 active:shadow-none">
          {loading ? "..." : "enter"}
        </button>
      </form>
      <span
        className="mt-4 text-green-500 hover:text-green-800 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Need help?
      </span>
      {showModal ? (
        <Modal
          className={
            "fixed z-50 w-screen h-screen flex items-center justify-center backdrop-filter backdrop-blur-sm top-0"
          }
          modalRef={modalRef}
          offClick={() => setShowModal(false)}
        >
          {loginModal}
        </Modal>
      ) : null}
    </div>
  );
};

export default Login;