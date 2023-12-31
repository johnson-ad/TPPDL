import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
// import { Input } from "postcss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/set_task`, { task: input })
      .then((res) => {
        console.log(res);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/api/get_task`)
      .then((res) => {
        setTask(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) return <h1>Loading</h1>;
  if (!user) route.push("/auth/login");
  if (user)
    return (
      
      <div className=" mt-10 px-4 flex flex-col items-center w-fill">
        <div className="shadow-xl mt-5 flex flex-col p-5 text-gray-700 rounded-lg">
            <h1 className=" text-2xl mb-2 ">
              Welcome to your dashboard{" "}
              <span className="font-bold text-blue-500">{user.displayName}</span>
            </h1>
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
              <input
                type="date"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-input px-3 py-2 rounded-full"
              />
              <button
                type="submit"
                className="text-white bg-green-700 p-3 mt-3  w-50 font-medium rounded-lg flex align-middle gap-2 "
              >
                Send
              </button>
            </form>
          </div>
          <div>
          <div className="flex flex-col  ">
            {task.map((t,index) => (
              <li key={index}>{t.task}</li>
            ))}
          </div>
          </div>
          <div>
          <button
          className="text-white bg-red-700 p-3 mt-3  w-50 font-medium rounded-lg flex align-middle gap-2 "
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
          </div>
        </div>
        
      </div>
    );
}
