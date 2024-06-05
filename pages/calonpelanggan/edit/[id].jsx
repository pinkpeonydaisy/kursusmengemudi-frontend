import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Edit = () => {
  const router = useRouter()
  const [ID, setID] = useState()
  const [nama, setNama] = useState("")
  const [kelasPelanggan, setKelasPelanggan] = useState("")
  const [umur, setUmur] = useState("")
  const [noWA, setNoWA] = useState("")
  const [alamat, setAlamat] = useState("")
  const [statusPelanggan, setStatusPelanggan] = useState("")
  const [adminKursus, setAdminKursus] = useState("")
  const [tanggalPendaftaran, setTanggalPendaftaran] = useState("")


  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
      nama,
      kelasPelanggan,
      umur,
      noWA,
      alamat,
      statusPelanggan,
      adminKursus,
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/calonpelanggan/update/" + router.query.id, {
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
    router.push("/calonpelanggan")
    return;
  }

  useEffect(() => {
    if (!router.isReady) return;
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/calonpelanggan/list/" + router.query.id, {
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
      setID(responsejson.data.calonPelangganID)
      setNama(responsejson.data.nama)
      setKelasPelanggan(responsejson.data.kelasPelanggan)
      setUmur(responsejson.data.umur)
      setNoWA(responsejson.data.noWA)
      setAlamat(responsejson.data.alamat)
      setStatusPelanggan(responsejson.data.statusPelanggan)
      setAdminKursus(responsejson.data.adminKursus)
      setTanggalPendaftaran(responsejson.data.tanggalPendaftaran)
    })
    //eslint-disable-next-line
  }, [router.isReady])
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/calonpelanggan")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Update  Pelanggan</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">ID Pelanggan</span>
            <input disabled value={ID} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nama Siswa</span>
            <input value={nama} onChange={(e) => {
              setNama(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">ID Kelas Pilihan</span>
            <input value={kelasPelanggan} onChange={(e) => {
              setKelasPelanggan(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Umur</span>
            <input value={umur} onChange={(e) => {
              setUmur(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">No WhatsApp</span>
            <input value={noWA} onChange={(e) => {
              setNoWA(e.target.value)
            }} type="tel" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Alamat</span>
            <input value={alamat} onChange={(e) => {
              setAlamat(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Status Pelanggan</span>
            <select value={statusPelanggan} onChange={(e) => {
              setStatusPelanggan(e.target.value)
            }}>
              <option value="Calon">Calon</option>
              <option value="Siswa">Siswa</option>
              <option value="Lulus">Lulus</option> </select>
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">ID Admin Kursus</span>
            <input value={adminKursus} onChange={(e) => {
              setAdminKursus(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Tanggal Pendaftaran</span>
            <input disabled value={new Date(tanggalPendaftaran).toLocaleDateString("sv-SE",{
              dateStyle:"short"
            }).split("/").join("-")} 
            type="date" className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto hover:cursor-pointer" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}

export default Edit