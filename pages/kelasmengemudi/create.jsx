import Template from "@/components/template"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Create = () => {
  const router = useRouter()
  const [namaKelas, setNamaKelas] = useState("")
  const [hargaKelas, setHargaKelas] = useState("")
  const [jumlahSesi, setJumlahSesi] = useState("")
  const [platNomorKendaraan, setPlatNomorKendaraan] = useState("")

  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
        namaKelas,
        hargaKelas,
        jumlahSesi,
        platNomorKendaraan,
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/kelasmengemudi/create", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body
    }).then(response => response).catch(() => null)
    if (updateQuery === null) {
      toast.error("Someting went wrong..")
      return
    }
    if (updateQuery.status !== 200) {
      toast.error("Failed to create...")
      return
    }
    toast.success("Successfully created!")
    router.push("/kelasmengemudi")
    return;
  }
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/kelasmengemudi")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Add Data Kelas</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nama Kelas</span>
            <input value={namaKelas} onChange={(e) => {
              setNamaKelas(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Harga Kelas</span>
            <input value={hargaKelas} onChange={(e) => {
              setHargaKelas(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Jumlah Sesi</span>
            <input value={jumlahSesi} onChange={(e) => {
              setJumlahSesi(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Plat Nomor Kendaraan</span>
            <input value={platNomorKendaraan} onChange={(e) => {
              setPlatNomorKendaraan(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>

          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}

export default Create
