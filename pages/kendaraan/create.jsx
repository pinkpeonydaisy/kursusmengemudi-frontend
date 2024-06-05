import Template from "@/components/template"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Create = () => {
  const router = useRouter()
  const [nomorKendaraan, setNomorKendaraan] = useState("")
  const [namaKendaraan, setNamaKendaraan] = useState("")
  const [jenisTransmisi, setJenisTransmisi] = useState("MATIC")
  const [jumlahKilometer, setJumlahKilometer] = useState("")
  const [tanggalTerakhirService, setTanggalTerakhirService] = useState("")
  const [statusKetersediaan, setStatusKetersediaan] = useState("AVAILABLE")
  const [statusKendaraan, setStatusKendaraan] = useState("READY")

  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
      nomorKendaraan,
      namaKendaraan,
      jenisTransmisi,
      jumlahKilometer,
      tanggalTerakhirService,
      statusKetersediaan,
      statusKendaraan
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/kendaraan/create", {
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
    router.push("/kendaraan")
    return;
  }
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/kendaraan")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Create Kendaraan</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nomor Plat Kendaraan</span>
            <input value={nomorKendaraan} onChange={(e) => {
              setNomorKendaraan(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nama Kendaraan</span>
            <input value={namaKendaraan} onChange={(e) => {
              setNamaKendaraan(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Jenis Transmisi Kendaraan</span>
            <select value={jenisTransmisi} onChange={(e) => {
              setJenisTransmisi(e.target.value)
            }}>
              <option value="MATIC">Matic</option>
              <option value="MANUAL">Manual</option>
            </select>
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Jumlah Kilometer Kendaraan</span>
            <input value={jumlahKilometer} onChange={(e) => {
              setJumlahKilometer(e.target.value)
            }} type="tel" required className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Tanggal Terakhir Service Kendaraan</span>
            <input value={tanggalTerakhirService} onChange={(e) => {
              setTanggalTerakhirService(e.target.value)
            }} type="date" required className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Status Ketersediaan Kendaraan</span>
            <select value={statusKetersediaan} onChange={(e) => {
              setStatusKetersediaan(e.target.value)
            }}>
              <option value="AVAILABLE">Available</option>
              <option value="IN USE">In Use</option>
            </select>
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Status Service Kendaraan</span>
            <select value={statusKendaraan} onChange={(e) => {
              setStatusKendaraan(e.target.value)
            }}>
              <option value="SERVICE">Service</option>
              <option value="READY">Ready</option>
            </select>
          </div>
          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}

export default Create