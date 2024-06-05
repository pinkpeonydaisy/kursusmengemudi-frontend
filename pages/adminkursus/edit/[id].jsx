import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Edit = () => {
  const router = useRouter()
  const [user_id, setuserid] = useState("")
  const [username, setusername] = useState("")
  const [password_hash, setpassword_hash] = useState("")
  const [password, setpassword] = useState("")


  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
      username,
      password: password || undefined
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/adminkursus/update/" + router.query.id, {
      method: "PATCH",
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
      toast.error("Failed to update...")
      return
    }
    toast.success("Successfully updated!")
    router.push("/adminkursus")
    return;
  }

  useEffect(() => {
    if (!router.isReady) return;
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/adminkursus/list/" + router.query.id, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).then(async response => {
      if (response.status !== 200) {
        toast.error("Failed to retrieve items")
        return
      }
      const responsejson = await response.json()
      setuserid(responsejson.data.user_id)
      setusername(responsejson.data.username)
      setpassword_hash(responsejson.data.password_hash)
    })
    //eslint-disable-next-line
  }, [router.isReady])
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/adminkursus")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Update  Admin Kursus</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>

          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">user_id</span>
            <input disabled value={user_id} type="tel" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Username</span>
            <input value={username} onChange={(e) => {
              setusername(e.target.value)
            }} type="text" className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Password</span>
            <input value={password} onChange={(e) => {
              setpassword(e.target.value)
            }} type="password" className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>

          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}

export default Edit