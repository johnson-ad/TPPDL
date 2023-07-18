import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Input } from "postcss";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  console.log(user);
  if (loading) return <h1>Loading</h1>;
  if (!user) route.push("/auth/login");
  if (user)
    return (
      
      <div className="shadow-xl mt-5 p-5 text-gray-700 rounded-lg w-full h-96">
        <h1>Welcome to your dashboard {user.displayName}</h1>
        <div className="bg-red-300">
          
                     
        </div>
        <button
            className="text-white bg-red-700 p-3 mt-3  w-50 font-medium rounded-lg flex align-middle gap-2 "
            onClick={() => auth.signOut()}
          >Sign out</button>
       
      </div>
    );
}
