import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  GithubAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // const auth = getAuth(firebase_app);

  //Sign in with email password

  async function signIn(email, password) {
    let result = null,
      error = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      route.push("/dashboard");
    } catch (e) {
      error = e;
      console.log(error);
    }

    return { result, error };
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    console.log(email, password);

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/dashboard");
  };

  //Sign in with facebook
  const fbProvider = new FacebookAuthProvider();
  const FacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const credantial = await FacebookAuthProvider.credentialFromResult(
        result
      );
      console.log(result);
      const token = credantial.accessToken;
      let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  //Sign in with github
  const gitProvider = new GithubAuthProvider();
  const GithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, gitProvider);
      const credential = await GithubAuthProvider.credentialFromResult(result);
      const token = await credential.accessToken;
      const user = await result.user;
      console.log(user);
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  //Sign in with twitter
  const twiProvider = new TwitterAuthProvider();
  const TwitterLogin = async () => {
    try {
      const result = await signInWithPopup(auth, twiProvider);
      const credential = await TwitterAuthProvider.credentialFromResult(result);
      const token = await credential.accessToken;
      const secret = await credential.secret;
      const user = await result.user;

      route.push("/dashboard");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     route.push("/dashboard");
  //   } else {
  //     console.log("login");
  //   }
  // }, [user]);

  return (
    <div className="grid grid-cols-2 gap-15 md:grid-cols-4  lg:grid-cols-3 mt-10 ">
      <div className="py-4  shadow-xl mt-12 p-10 text-gray-700 rounded-lg w-96">
        <h3 className="text-3xl font-medium">Sign in with email</h3>
        <div>
          <div className="form-wrapper">
            <form onSubmit={handleForm} className="form space-y-6">
              <label htmlFor="email">
                <p className="text-1xl mt-2 mb-2 font-bold">Email</p>
                <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com"
                  className="border p-4 w-full font-medium rounded-lg flex align-middle gap-2" />
              </label>
              <label htmlFor="password">
                <p className="text-1xl mt-2 mb-2 font-bold">Mot de passe</p>
                <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="Mon mot de passe"
                  className="border p-4 w-full font-medium rounded-lg flex align-middle gap-2" />
              </label>
              <button className="text-white bg-gray-900 p-4 w-full font-medium rounded-lg flex align-middle gap-2 align-items-center justify-center hover:bg-gray-700">
                Se connecter
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className="py-4  shadow-xl mt-12 p-10 text-gray-700 rounded-lg w-96">
        <h3 className="py-4 text-2xl font-medium">Sign in with one of the providers</h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={GoogleLogin}
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
          <button
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
            onClick={FacebookLogin}
          >
            <AiFillFacebook className="text-2xl text-blue-300" />
            Sign in with Facebook
          </button>
          <button
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
            onClick={GithubLogin}
          >
            <AiFillGithub className="text-2xl text-blue-300" />
            Sign in with Github
          </button>
          <button
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
            onClick={TwitterLogin}
          >
            <FaTwitter className="text-2xl text-blue-300" />
            Sign in with Twitter
          </button>
        </div>
      </div>

    </div>
  );
}
