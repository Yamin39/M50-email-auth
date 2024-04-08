import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const { setUser } = useContext(AuthContext);

  const [showPassToggle, setShowPassToggle] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorAlert("");
    setSuccessAlert("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        if (result.user.emailVerified) {
          setSuccessAlert("Login successful");
          e.target.reset();
        } else {
          setErrorAlert("Please verify your email to proceed. An verification email has been sent to your email. Then try to log in again");
          sendEmailVerification(result.user)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorAlert(error.message);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    setSuccessAlert("");
    setErrorAlert("");

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrorAlert("Invalid email address");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then((result) => {
        console.log(result);
        setSuccessAlert("Please check your email inbox. An confirmation email has been sent to your email.");
      })
      .catch((error) => {
        console.log(error);
        setErrorAlert(error);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input type={showPassToggle ? "text" : "password"} name="password" placeholder="password" className="input w-full input-bordered" required />
                <span onClick={() => setShowPassToggle(!showPassToggle)} className="text-lg absolute right-3 top-4 cursor-pointer">
                  {showPassToggle ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
              <div className="mt-1 flex justify-between flex-wrap items-center">
                <label className="label">
                  <a onClick={handleForgotPassword} className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
            </div>
            {successAlert && (
              <div role="alert" className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{successAlert}</span>
              </div>
            )}
            {errorAlert && (
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorAlert}</span>
              </div>
            )}
            <div className="form-control mt-3">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
            <div className="mt-2">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline text-primary">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
