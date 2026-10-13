import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, ServerCog } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/firsebase";
import { USER_AVTAR } from "../utils/constant";
import { validationData } from "../utils/validationData";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACK_IMG } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const message = validationData(
      isSignInForm ? "" : name.current.value,
      email.current.value.trim(),
      password.current.value
    );

    if (message) {
      setErrorMessage(message);
      return;
    }

    try {
      setIsLoading(true);

      let user;

      if (!isSignInForm) {
        // SIGN UP: Create a new Firebase account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value.trim(),
          password.current.value
        );

        user = userCredential.user;

        // Save name and avatar to Firebase profile
        await updateProfile(user, {
          displayName: name.current.value.trim(),
          photoURL: USER_AVTAR,
        });
      } else {
        // SIGN IN: Authenticate an existing Firebase account
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value.trim(),
          password.current.value
        );

        user = userCredential.user;
      }

      // Update Redux with authenticated user information
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      // Go to the existing Browse page
      navigate("/browse");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email is already registered. Please sign in."
          );
          break;

        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setErrorMessage("Please choose a stronger password.");
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMessage("Invalid email or password. Please try again.");
          break;

        case "auth/too-many-requests":
          setErrorMessage("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setErrorMessage("Network error. Check your internet connection.");
          break;

        default:
          setErrorMessage(
            error.message || "Something went wrong. Please try again."
          );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm((previous) => !previous);
    setErrorMessage("");
  };

  return (
    <div
      className="min-h-screen grid md:grid-cols-2 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat">
       <img
      src={BACK_IMG}
      alt="BACK_IMG"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />

      {/* Dark background overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Left welcome section */}
      <div className="hidden md:flex relative items-center justify-center overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative text-center px-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            {isSignInForm ? "Welcome Back to" : "Join"}{" "}
            <span className="text-red-500">FilmSphere</span>
          </h1>

          <p className="text-gray-300 mt-5 text-lg">
            {isSignInForm
              ? "Continue watching your favourites"
              : "Discover your next favourite movie"}
          </p>
        </div>
      </div>

      {/* Authentication form */}
      <div className="flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-2">
            {isSignInForm ? "Sign In" : "Create Account"}
          </h2>

          <p className="text-gray-400 mb-8">
            {isSignInForm
              ? "Continue watching your favourites"
              : "Create your FilmSphere account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name: Sign Up only */}
            {!isSignInForm && (
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <input
                  ref={name}
                  type="text"
                  placeholder="Full name"
                  autoComplete="name"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/60 border border-gray-700 focus:border-red-600 focus:ring-2 focus:ring-red-600/50 outline-none transition"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <input
                ref={email}
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/60 border border-gray-700 focus:border-red-600 focus:ring-2 focus:ring-red-600/50 outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <input
                ref={password}
                type="password"
                placeholder="Password"
                autoComplete={
                  isSignInForm ? "current-password" : "new-password"
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/60 border border-gray-700 focus:border-red-600 focus:ring-2 focus:ring-red-600/50 outline-none transition"
                required
              />
            </div>

            {/* Firebase / validation errors */}
            {errorMessage && (
              <p
                role="alert"
                className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
              >
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed py-4 rounded-2xl font-semibold transition-all shadow-xl"
            >
              {isLoading
                ? isSignInForm
                  ? "Signing in..."
                  : "Creating account..."
                : isSignInForm
                  ? "Sign In"
                  : "Sign Up"}

              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="flex justify-center items-center mt-6 text-sm text-gray-400">
            <span>
              {isSignInForm
                ? "New to FilmSphere? "
                : "Already have an account? "}
            </span>

            <button
              type="button"
              onClick={toggleSignInForm}
              className="ml-1 text-white hover:text-red-400 transition-colors font-semibold"
            >
              {isSignInForm ? "Sign Up" : "Sign In"}
            </button>
          </div>

          {/* Decorative glow effects */}
          <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

          <div className="absolute -bottom-20 -right-32 w-[300px] h-[300px] bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Login;
