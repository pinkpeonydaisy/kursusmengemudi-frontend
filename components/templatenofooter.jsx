import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
const Template = ({ children }) => {
  const router = useRouter()
  const [userObject, setUser] = useState(null)
  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/auth/login")
    return;
  }
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("/");
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return;
    const tokenParsed = token.split(" ")[1]
    fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
      if (response.status !== 200) return null;
      const responsejson = await response.json();
      setUser(responsejson.data)
    }).catch(error=>{
      console.error(error)
      return
    })
  }, [])
  return <>
    <header className="flex flex-row align-middle justify-between bg-[#AEDEFC] px-10">
      <div className="flex flex-row align-middle justify-center space-x-3">
      <Image className="hover:cursor-pointer" src="/logo.png" alt="Main Logo" width={100} height={100} onClick={()=>
        router.push("/")}/>
        <span className="h-min my-auto font-bold text-xl">SISTEM MANAJEMEN KURSUS MENGEMUDI RPL</span>
      </div>
      <div className="flex flex-row align-middle justify-center space-x-6">
        {userObject === null && <span className="h-min my-auto font-semibold">Login as Admin Kursus/Owner?</span>}
        {userObject !== null && <span className="h-min my-auto font-semibold">Logged in as {userObject.tipe_user}</span>}
        {userObject === null && <button className="bg-[#F875AA] h-1/2 w-28 rounded-2xl font-bold text-white text-xl  my-auto p-2 " onClick={handleLogin}>Log In</button>}
        {userObject !== null && (
          <>
          <button className="bg-[#F875AA] h-1/2 w-30 rounded-2xl font-bold text-white text-xl  my-auto p-2 " onClick={(e)=>{
            e.preventDefault()
            if (userObject.tipe_user === "OWNER"){
              router.push("/dashboard/owner")
              return
            }
            if (userObject.tipe_user === "ADMIN"){
              router.push("/dashboard/admin")
              return
            } 
            return
          }}>Dashboard</button>
          <button className="bg-[#F875AA] h-1/2 w-30 rounded-2xl font-bold text-white text-xl  my-auto p-2 " onClick={handleLogout}>Log Out</button>
          </>

        )}      
        </div>
    </header >
    {children}
  </>
}
export default Template