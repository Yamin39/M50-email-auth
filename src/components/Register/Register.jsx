import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Register = () => {
  const {setUser} = useContext(AuthContext);

  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [showPassToggle, setShowPassToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const isCheckedTerms = e.target.terms.checked;
    console.log(email);
    console.log(password);
    console.log(isCheckedTerms);
    setErrorAlert("");
    setSuccessAlert("");

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrorAlert("Invalid email address");
      return;
    }

    if (password.length < 6) {
      setErrorAlert("Password should be 6 characters or more");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorAlert("Password should have 1 uppercase character");
      return;
    }

    if (!isCheckedTerms) {
      setErrorAlert("Please accept our terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: null,
        })
          .then((result) => {
            console.log(result);
            setUser(result.user)
          })
          .catch((error) => {
            console.log(error);
            setErrorAlert(error);
          });

        // send email verification
        sendEmailVerification(result.user)
          .then((result) => {
            console.log(result);
            setSuccessAlert("Please check your email and verify your account");
          })
          .catch((error) => console.log(error));
        // reset form
        e.target.name.value = "";
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.terms.checked = false;
      })
      .catch((error) => {
        console.log(error);
        setErrorAlert(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
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
              <div className="flex items-center gap-2 mt-3">
                <input type="checkbox" name="terms" id="terms" className="checkbox" />
                <label htmlFor="terms" className="text-sm">
                  Accept our{" "}
                  <a className="underline" href="">
                    terms and conditions
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
              <input type="submit" value="Register" className="btn btn-primary" />
            </div>
            <div className="mt-2">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline text-primary">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
