import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Edit = () => {
  const router = useRouter()
  const [NIK, setNIK] = useState("")
  const [namaLengkap, setNamaLengkap] = useState("")
  const [alamat, setAlamat] = useState("")
  const [noTelp, setTelp] = useState("")
  const [noRekening, setRekening] = useState("")

  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
      namaLengkap,
      alamatInstruktur: alamat,
      noTelp,
      noRekening
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/instruktur/update/" + router.query.id, {
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
    router.push("/instruktur")
    return;
  }

  useEffect(() => {
    if (!router.isReady) return;
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/instruktur/list/" + router.query.id, {
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
      setNIK(responsejson.data.nikInstruktur)
      setNamaLengkap(responsejson.data.namaLengkap)
      setAlamat(responsejson.data.alamatInstruktur)
      setTelp(responsejson.data.noTelp)
      setRekening(responsejson.data.noRekening)
    })
    //eslint-disable-next-line
  }, [router.isReady])
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/instruktur")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Update Instruktur</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">NIK</span>
            <input disabled value={NIK} type="tel" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nama Lengkap</span>
            <input value={namaLengkap} onChange={(e) => {
              setNamaLengkap(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Alamat</span>
            <input value={alamat} onChange={(e) => {
              setAlamat(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">No Telp</span>
            <input value={noTelp} onChange={(e) => {
              setTelp(e.target.value)
            }} type="tel" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">No Rekening</span>
            <input value={noRekening} onChange={(e) => {
              setRekening(e.target.value)
            }} type="tel" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}

export default Edit