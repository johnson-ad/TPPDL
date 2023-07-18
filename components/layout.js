import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="mx-14">
      <Nav />
      {/* */}
      <main  className="flex justify-center items-center w-full">{children}</main>
    </div>
  );
}
