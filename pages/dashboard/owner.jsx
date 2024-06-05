import Template from "@/components/templatenofooter"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

const DashboardOwner = () => {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) {
      window.location.replace("/auth/login")
    }
    const tokenParsed = token.split(" ")[1]
    fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
      if (response.status !== 200) {
        console.log(response)
        toast.error("Failed to retrieve items")
        return;
      }
      const responsejson = await response.json();
      if (responsejson.data.tipe_user !== "OWNER") {
        window.location.replace("/auth/login")
        return
      }
    }).catch(error => {
      console.error(error)
      return
    })
  }, [])

  return (
    <Template>
      <main className="min-h-screen px-20 py-20 bg-[#FFF6F6] flex flex-col align-middle space-y-20">
        <h2 className="text-center text-5xl font-extrabold text-[#F875AA] ">Selamat datang kembali, Helmi!</h2>
        <div className="flex flex-row align-middle justify-evenly">
          <div className="bg-white rounded-xl px-5 py-10 space-y-5 flex flex-col align-middle justify-evenly shadow-xl shadow-[#FFDFE0] w-1/4">
            <span className="text-center font-extrabold text-xl text-[#F875AA]">Data Kelas Yang Tersedia</span>
            <Image className="mx-auto" src="/todolist.png" width={99} height={100} alt="Data Kelas" />
            <button className="bg-sky-200 rounded-xl font-bold text-center w-min mx-auto px-10 py-3" onClick={
              () => router.push("/kelasmengemudi")}>Ubah</button>
          </div>
          <div className="bg-white rounded-xl px-5 py-10 space-y-5 flex flex-col align-middle justify-evenly shadow-xl shadow-[#FFDFE0] w-1/4">
            <span className="text-center font-extrabold text-xl text-[#F875AA]">Akun Pengguna Admin</span>
            <Image className="mx-auto" src="/setting.png" width={117} height={117} alt="Akun Pengguna Admin" />
            <button className="bg-sky-200 rounded-xl font-bold text-center w-min mx-auto px-10 py-3" onClick={
              () => router.push("/adminkursus")}>Ubah</button>
          </div>
          <div className="bg-white rounded-xl px-5 py-10 space-y-5 flex flex-col align-middle justify-evenly shadow-xl shadow-[#FFDFE0] w-1/4">
            <span className="text-center font-extrabold text-xl text-[#F875AA]">Info Perusahaan dan FAQ</span>
            <Image className="mx-auto" src="/briefcase.png" width={108} height={108} alt="Data Kelas" />
            <button className="bg-sky-200 rounded-xl font-bold text-center w-min mx-auto px-10 py-3" onClick={
              () => router.push("/infoperusahaan")}>Ubah</button>
          </div>

        </div>
        <div className="flex flex-row align-middle justify-center space-x-32">
          <div className="bg-white rounded-xl px-5 py-10 space-y-5 flex flex-col align-middle justify-evenly shadow-xl shadow-[#FFDFE0] w-1/4">
            <span className="text-center font-extrabold text-xl text-[#F875AA]">Data Kendaraan</span>
            <Image className="mx-auto" src="/sedan.png" width={117} height={117} alt="Data Kendaraan" />
            <button className="bg-sky-200 rounded-xl font-bold text-center w-min mx-auto px-10 py-3" onClick={
              () => router.push("/kendaraan")}>Ubah</button>
          </div>
          <div className="bg-white rounded-xl px-5 py-10 space-y-5 flex flex-col align-middle justify-evenly shadow-xl shadow-[#FFDFE0] w-1/4">
            <span className="text-center font-extrabold text-xl text-[#F875AA]">Data Instruktur</span>
            <Image className="mx-auto" src="/instructor.png" width={112} height={112} alt="Data Instruktur" />
            <button className="bg-sky-200 rounded-xl font-bold text-center w-min mx-auto px-10 py-3" onClick={
              () => router.push("/instruktur")}>Ubah</button>
          </div>

        </div>
      </main>
    </Template>

  )
}
export default DashboardOwner
