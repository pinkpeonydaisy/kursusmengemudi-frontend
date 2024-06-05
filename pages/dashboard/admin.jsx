import Template from "@/components/templatenofooter"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

const DashboardAdmin = () => {
  const router = useRouter();
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) {
      window.location.replace("/auth/login")
    }
    const tokenParsed = token.split(" ")[1]
    fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
      if (response.status !== 200) {
        toast.error("Failed to retrieve items")
        return;
      }
      const responsejson = await response.json();
      if (responsejson.data.tipe_user !== "ADMIN") {
        window.location.replace("/auth/login")
        return
      }
      setUsername(responsejson.data.username)

    }).catch(error => {
      console.error(error)
      return
    })
  }, [])

  return (
    <Template>
      <main className="min-h-screen p-28 flex flex-col align-middle justify-center bg-[#FFF6F6] space-y-20">
        <h1 className="text-5xl text-center font-extrabold text-[#F875AA]">Selamat datang kembali, {username}</h1>
            <div className="bg-white rounded-xl p-10 space-y-14 flex flex-col align-middle justify-evenly shadow-xl shadow-[#FFDFE0] w-1/3 mx-auto">
              <span className="text-center font-bold text-4xl text-[#F875AA]">Data <br></br>Pelanggan</span>
              <Image className="mx-auto" src="/client.png" width={126} height={53} alt="Data Kelas" />
              <button onClick={(e) => {
                e.preventDefault();
                router.push("/calonpelanggan")
                return;
              }} className="bg-sky-200 rounded-xl font-bold text-center w-min mx-auto px-10 py-3">Ubah</button>
            </div>
      </main>
    </Template>
  )
}

export default DashboardAdmin