import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Image from "next/image"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  return (
    <main className="min-h-screen px-14 py-7 bg-[#FFF6F6] flex flex-col">
      <div className="fex flex-row w-full">
        <button className="text-xl text-[#F875AA] font-extrabold" onClick={
              ()=>router.replace("/")}>Back</button>
      </div>
      <div className="flex flex-col w-1/2 align-middle justify-around mx-auto my-auto">
        <h1 className="text-center font-extrabold text-5xl text-[#F875AA]">Log In</h1>
        <div className="w-full"><Image src={"/logo.png"} width={400} height={400} alt="Main Logo" className="mx-auto"/></div>
    <form className="flex flex-col align-middle justify-evenly space-y-8" onSubmit={(e) => {
        e.preventDefault()
        const requestBody = JSON.stringify({
            username,password
        })
        fetch("https://rpl-backend-production.up.railway.app/v1/auth/login", {
            method: "POST",
            body: requestBody,
            headers: {
              "Content-Type": "application/json"
            }
          }).then(async (response) => {
            if (response.status !== 200){
                toast.error("Failed to login..")
                return
            }
            const responsejson = await response.json();
            const type = responsejson.data.type 
            const token = responsejson.data.token
            window.localStorage.setItem("token", `${type} ${token}`)

            fetch("https://rpl-backend-production.up.railway.app/v1/auth/verify/" + token,)
                .then(async(response) =>{
                    const responsejson = await response.json();
                    if (responsejson.data.tipe_user === "OWNER"){
                        router.push("/dashboard/owner")
                        return
                    }
                    if (responsejson.data.tipe_user === "ADMIN"){
                        router.push("/dashboard/admin")
                        return
                    }
            })
          }).catch(() => {
            toast.error("Something went wrong..")
          })
  
    }}>
        <div className="flex flex-row align-middle justify-between ">
          <span className="h-min my-auto font-extrabold text-[#F875AA] text-xl">Username</span>
          <input className="w-2/3 drop-shadow-lg p-3 rounded-xl shadow shadow-[#FFDFE0]" type="text" placeholder="Username" required value={username} onChange={(e) => {
            setUsername(e.target.value)
          }}/>
        </div>
        <div className="flex flex-row align-middle justify-between ">
          <span className="h-min my-auto font-extrabold text-[#F875AA] text-xl">Password</span>
          <input className="w-2/3 drop-shadow-lg p-3 rounded-xl shadow shadow-[#FFDFE0]" type="password" placeholder="Password" required value={password} onChange={(e) => {
            setPassword(e.target.value)
          }}/>
        </div>
        <input type="submit" value={"Log In"} className="w-min px-20 py-3 mx-auto bg-pink-400  rounded-xl text-white font-bold text-2xl hover:cursor-pointer"/>
      </form>
      
      </div>
    </main>
  )
}

export default Login