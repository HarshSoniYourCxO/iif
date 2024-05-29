"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const redirecthandel = ()=>{
        router.push('/');
    }
  return (
    <>
    <div className="h-screen  w-screen flex items-center justify-center">
        <div className="w-[30vw]  h-[20vh] flex flex-column items-center justify-center">

                <button onClick ={()=>redirecthandel()} className="w-fit h-fit p-4 bg-blue-700 text-white text-bold rounded-lg">Return to Home page</button>
        </div>
    </div>
    </>
  );
}
