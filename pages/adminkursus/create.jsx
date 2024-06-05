import Template from "@/components/template"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Create = () => {
  const router = useRouter()
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")


  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
      username,
      password
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/adminkursus/create", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body
    }).then(response => response).catch(() => null)
    if (updateQuery === null) {
      toast.error("Something went wrong..")
      return
    }
    if (updateQuery.status !== 200) {
      toast.error("Failed to create...")
      return
    }
    toast.success("Successfully created!")
    router.push("/adminkursus")
    return;
  }
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace('/adminkursus')
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Create  Admin Kursus</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
    
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Username</span>
            <input value={username} onChange={(e) => {
                setusername(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Password</span>
            <input value={password} onChange={(e) => {
              setpassword(e.target.value)
            }} type="password" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>

          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>
}

export default Create