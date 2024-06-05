import Template from "@/components/template";
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

export default function InformasiPerusahaan({ propertyWebsite }) {
  const [deskripsi, setDeskripsi] = useState("")
  const [faq, setFaq] = useState([])
  const [deleteToggle, setDeleteToggle] = useState(null)

  const router = useRouter();
  const saveDeskripsi = () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/")
      return;
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/property/description", {
      method: "PATCH",
      body: JSON.stringify({
        description: deskripsi
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.status !== 200) {
        toast.error("Failed to update description")
        return
      }
      toast.success("Successfully saved description")
      return
    }).catch((err) => {
      toast.error("Something went wrong when trying to save the description")
      return
    })
  }

  const handleDelete = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const deleteRequest = await fetch("https://rpl-backend-production.up.railway.app/v1/property/faq/delete/" + deleteToggle, {
      method: "DELETE",
      headers: {
        Authorization: token,
      }
    }).then(response => response).catch(() => null)
    setDeleteToggle(null)
    if (deleteRequest === null) {
      toast.error("Something went wrong...");
      return;
    }
    if (deleteRequest.status !== 200) {
      toast.error("Failed to delete..");
      return;
    }
    toast.success("Successfully deleted!");
    router.reload();
    return;
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/property").then(async (response) => {
      const responsejson = await response.json()
      setDeskripsi(responsejson.data.description)
      setFaq(responsejson.data.faq)
    })
  }, [])

  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.push("/dashboard/owner")
          }}>Back</span>
        </div>
        <div>
          <h1 className="text-[#F875AA] font-extrabold text-5xl mt-10 mb-10 text-center">Informasi Perusahaan</h1>
        </div>
        <div>
          <h1 className="text-[#F875AA] font-extrabold text-3xl mt-10 mb-10 text-lef ml-3">Deskripsi Perusahaan</h1>
        </div>
        <div className="flex flex-row align-middle justify-between">
          <textarea rows="4" style={{resize: "vertical"}} value={deskripsi} onChange={(e) => {
            setDeskripsi(e.target.value)
          }} type="text" required className="drop-shadow-xl w-5/6 p-2 rounded-xl"/>
          <button className="px-9 h-12 rounded bg-[#FFDFDF] border-2 border-[#F875AA]" onClick={() => {
            saveDeskripsi()
          }}>Simpan</button>
        </div>
        <div>
          <span className="text-[#16A4FF]">*) Minimum 10 karakter, maksimal 500 karakter</span>
        </div>
        <div className="flex flex-row items-center align-middle justify-between">
          <h1 className="text-[#F875AA] font-extrabold text-3xl mt-10 mb-10 ml-3">Frequently Asked Questions</h1>
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              router.push("/infoperusahaan/create")
            }} className="bg-[#F875AA] p-3 text-lg font-bold text-white rounded-2xl">Tambah FAQ</button>
          </div>
        </div>
        <table className="w-full text-center items-center border-spacing-3 border-separate">
          <thead>
            <tr>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Question</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Answer</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {faq.map((item, index) => {
              return <tr key={index}>
                <td className="p-2 border border-[#F875AA] bg-white">{item.question}</td>
                <td className="p-2 border border-[#F875AA] bg-white">{item.answer}</td>
                <td className="px-2 mx-auto flex flex-col align-middle justify-evenly space-y-2">
                  <button className="bg-[#AEDEFC] p-3 rounded-lg" onClick={(e) => {
                    e.preventDefault();
                    router.push("/infoperusahaan/edit/" + index)
                    return;
                  }}>Update</button>
                  <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="bg-[#FFDFDF] p-3 rounded-lg" onClick={(e) => {
                    e.preventDefault()
                    setDeleteToggle(index)
                  }}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </main>
      {deleteToggle !== null && <div className="left-0 top-0 fixed w-screen h-screen bg-white bg-opacity-80 p-20 flex flex-col align-middle justify-center">
        <div className="w-1/2 mx-auto space-y-5">
          <h1 className="text-center p-10 bg-[#FFDFDF] border-2 border-[#F875AA] rounded-xl font-bold text-xl">Apakah anda yakin akan menghapus data Frequently Asked Questions?</h1>
          <div className="space-x-5 flex flex-row align-middle justify">
            <button className="p-3 rounded-xl w-full bg-[#FFDFDF] border-2 border-[#F875AA]" onClick={(e) => {
              e.preventDefault();
              handleDelete()
            }}>Delete</button>
            <button className="p-3 rounded-xl w-full bg-[#FFDFDF] border-2 border-[#F875AA]" onClick={(e) => {
              e.preventDefault()
              setDeleteToggle(null)
            }}>Cancel</button>
          </div>
        </div>
      </div>}
    </Template>
  </>
}
