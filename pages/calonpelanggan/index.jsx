import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Index = () => {
  const [rows, setRows] = useState([])
  const router = useRouter()
  const [deleteToggle, setDeleteToggle] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setLastPage] = useState(false)

  const getNextPage = async (page) => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return;
    }
    const getItems = await fetch("https://rpl-backend-production.up.railway.app/v1/calonpelanggan/list?page=" + (page), {
      method: "GET",
      headers: {
        Authorization: token
      }
    }).then(response => response).catch(() => null)
    if (getItems === null) {
      toast.error("Something went wrong..")
      return;
    }
    if (getItems.status !== 200) {
      toast.error("Unable to get more items!")
      return
    }
    const responsejson = await getItems.json();
    setLastPage(responsejson.data.length < 10)
    setRows(responsejson.data);
    return
  }
  const handleDelete = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const deleteRequest = await fetch("https://rpl-backend-production.up.railway.app/v1/calonpelanggan/delete/" + deleteToggle, {
      method: "DELETE",
      headers: {
        Authorization: token
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
    fetch("https://rpl-backend-production.up.railway.app/v1/calonpelanggan/list", {
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
      setRows(responsejson.data)
    })
  }, [])
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.replace("/dashboard/admin")
          }}>Back</span>
        </div>
        <div className="flex flex-row align-middle justify-between">
          <h1 className="text-[#F875AA] font-extrabold text-5xl mb-8">Data  Pelanggan</h1>
          <button onClick={(e) => {
            e.preventDefault();
            router.push("/calonpelanggan/create")
          }} className="bg-[#F875AA] p-4 text-lg font-bold text-white rounded-3xl">Create</button>
        </div>
        <table className="w-full text-center border-spacing-3 border-separate">
          <thead>
            <tr>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">ID</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Nama Pelanggan</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Kelas Pelanggan</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Umur</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Nomor WhatsApp</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Alamat</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Status Pelanggan</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Admin Kursus</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Tanggal Pendaftaran</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return <tr key={row.calonPelangganID}>
                <td className="p-6 border border-[#F875AA] bg-white">{row.calonPelangganID}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.nama}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.kelasPelanggan}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.umur}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.noWA}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.alamat}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.statusPelanggan}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.adminKursus}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{new Date(row.tanggalPendaftaran).toLocaleDateString("id-ID",{
                  dateStyle:"long"
                })}</td>
                <td className="px-2 flex flex-col align-middle justify-evenly space-y-2 ">
                  <button className="bg-[#AEDEFC] p-1 rounded-lg" onClick={(e) => {
                    e.preventDefault();
                    router.push("/calonpelanggan/edit/" + row.calonPelangganID)
                    return;
                  }}>Update</button>
                  <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="bg-[#FFDFDF] p-1 rounded-lg" onClick={(e) => {
                    e.preventDefault()
                    setDeleteToggle(row.calonPelangganID)
                  }}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
        <div className="flex flex-row align-middle justify-around">
          <button className="bg-red-400 p-5 rounded-2xl text-white font-bold" disabled={currentPage === 1} onClick={() => {
            getNextPage(currentPage - 1)
            setCurrentPage(page => page - 1)
          }}>Prev</button>
          <span className="h-min my-auto font-bold">Page {currentPage}</span>
          <button className="bg-blue-400 p-5 rounded-2xl text-white font-bold" disabled={isLastPage} onClick={() => {
            getNextPage(currentPage + 1)
            setCurrentPage(page => page + 1)
          }}>Next</button>
        </div>
      </main>
      {deleteToggle !== null && <div className="left-0 top-0 fixed w-screen h-screen bg-white bg-opacity-80 p-20 flex flex-col align-middle justify-center">
        <div className="w-1/2 mx-auto space-y-5">
          <h1 className="text-center p-10 bg-[#FFDFDF] border-2 border-[#F875AA] rounded-xl font-bold text-xl">Apakah anda yakin akan menghapus data pelanggan?</h1>
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
    </Template >
  </>

}

export default Index