import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constant";
import { Search, Bell, LogOut, ChevronDown } from "lucide-react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const dropdownRef = useRef(null);

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      navigate("/error");
    }
  };

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await firebaseUser.reload();

          const updatedUser = auth.currentUser;

          if (updatedUser) {
            dispatch(
              addUser({
                uid: updatedUser.uid,
                email: updatedUser.email,
                displayName: updatedUser.displayName,
                photoURL: updatedUser.photoURL,
              })
            );
          }
        } catch (error) {
          console.error("Failed to refresh user:", error);
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8 lg:px-14">

        {/* Left: Netflix Logo */}
        <div className="flex items-center gap-6 lg:gap-10">
          <img
            src={LOGO}
            alt="Netflix"
            onClick={() => navigate(user ? "/browse" : "/")}
            className="w-24 cursor-pointer object-contain sm:w-32 lg:w-36"
          />

          {/* Desktop Navigation: Only when logged in */}
          {user && (
            <nav className="hidden items-center gap-5 text-sm text-gray-300 md:flex cursor-pointer">
              <button
                onClick={() => navigate("/")}
              className="transition hover:text-white cursor-pointer "
              >
                Home
              </button>

              <button
                onClick={() => navigate("/browse")}
               className="transition hover:text-white cursor-pointer"
              >
                Explore
              </button>

              <button
               className="transition hover:text-white cursor-pointer">
                TV Shows
              </button>

              <button className="transition hover:text-white cursor-pointer">
                Movies
              </button>
            </nav>
          )}
        </div>

        {/* Right: Actions and Profile */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Search: Only when logged in */}
          {user && (
            <>
              <button
                aria-label="Search"
                className="text-white transition duration-200 hover:scale-110 hover:text-gray-300"
              >
                <Search size={21} />
              </button>

              {/* Notifications */}
              <button
                aria-label="Notifications"
                className="text-white transition duration-200 hover:scale-110 hover:text-gray-300"
              >
                <Bell size={21} />
              </button>
            </>
          )}

          {/* Sign In: Only when logged out */}
          {!user && (
            <Link
              to="/login"
              className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg active:scale-95"
            >
              Sign In
            </Link>
          )}

          {/* Profile Dropdown: Only when logged in */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                aria-label="Open profile menu"
                aria-expanded={showDropdown}
                className="flex items-center gap-2 rounded-md p-1 transition hover:bg-white/10"
              >
                <img
                  className="h-8 w-8 rounded object-cover sm:h-9 sm:w-9"
                  alt="User profile"
                  src={
                    user.photoURL ||
                    "https://placehold.co/100x100?text=User"
                  }
                />

                <ChevronDown
                  size={16}
                  className={`text-white transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-md border border-white/15 bg-[#141414] py-2 text-white shadow-2xl">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="truncate text-sm font-semibold">
                      {user.displayName || "Netflix User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-400">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;