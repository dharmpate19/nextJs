import Image from "next/image";

export default function Home() {
  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <div className="text-center">
        <h1 className="text-4xl contact-bold">Welcome to contact manager</h1>
        <p className="mt-2 text-large text-gray-600">Manage your contact easily and efficiently</p>
      </div>
      <Image src="window.svg" alt="Contact Manager" width={300} height={300} className="rounded-lg shadow-lg"/>
      <div className="text-center">
        <p className="mt-2 text-large text-gray-600">STart Managing your contact today</p>
        
      </div>
    </div>
  );
}
