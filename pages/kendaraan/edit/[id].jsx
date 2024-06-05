import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Edit = () => {
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
      jumlahKilometer,
      tanggalTerakhirService,
      statusKetersediaan,
      statusKendaraan
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/kendaraan/update/" + router.query.id, {
      method: "PATCH",
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
      toast.error("Failed to update...")
      return
    }
    toast.success("Successfully updated!")
    router.push("/kendaraan")
    return;
  }

  useEffect(() => {
    if (!router.isReady) return;
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/kendaraan/list/" + router.query.id, {
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
      setNomorKendaraan(responsejson.data.nomorKendaraan)
      setNamaKendaraan(responsejson.data.namaKendaraan)
      setJenisTransmisi(responsejson.data.jenisTransmisi)
      setJumlahKilometer(responsejson.data.jumlahKilometer)
      setTanggalTerakhirService(responsejson.data.tanggalTerakhirService)
      setStatusKetersediaan(responsejson.data.statusKetersediaan)
      setStatusKendaraan(responsejson.data.statusKendaraan)
    })
    //eslint-disable-next-line
  }, [router.isReady])
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/kendaraan")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Update Kendaraan</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nomor Plat Kendaraan</span>
            <input disabled value={nomorKendaraan} type="text" required className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nama Kendaraan</span>
            <input disabled value={namaKendaraan} type="text" required className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Jenis Transmisi Kendaraan</span>
            <select disabled value={jenisTransmisi} onChange={(e) => {
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
            <input value={new Date(tanggalTerakhirService).toLocaleDateString("sv-SE",{
              dateStyle:"short"
            }).split("/").join("-")} onChange={(e) => {
              setTanggalTerakhirService(e.target.value)
            }} type="date" className="drop-shadow-xl w-2/4 p-2 rounded-xl" />
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

export default Edit