import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="mx-14">
      <Nav />
      {/*    flex justify-center items-center w-full"*/}
      <main  className="flex min-h-screen flex-col justify-between ">{children}</main>
    </div>
  );
}
