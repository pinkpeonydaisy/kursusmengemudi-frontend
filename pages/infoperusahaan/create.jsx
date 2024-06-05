import Template from "@/components/template"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Create = ({ propertyWebsite }) => {
  const router = useRouter()
  const [faq, setFaq] = useState({
    question: "",
    answer: ""
  })


  const handleUpdate = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const body = JSON.stringify({
      question: faq.question,
      answer: faq.answer
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/property/faq", {
      method: "PUT",
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
    router.push("/infoperusahaan")
    return;
  }
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.push("/infoperusahaan")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Tambah Data FAQ</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Question</span>
            <input value={faq.question} onChange={(e) => {
              setFaq({
                question: e.target.value,
                answer: faq.answer
              })
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div>
            <span className="text-[#16A4FF]">*) Minimum 10 karakter</span>
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Answer</span>
            <input value={faq.answer} onChange={(e) => {
              setFaq({
                question: faq.question,
                answer: e.target.value
              })
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div>
            <span className="text-[#16A4FF]">*) Minimum 10 karakter</span>
          </div>
          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}
export const getServerSideProps = async () => {
  const propertyQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/property", {
    method: "GET",
  }).catch(error => {
    return null
  })
  let propertyWebsite;
  if (propertyQuery === null) propertyWebsite = {
    description: "",
    faq: []
  }
  else {
    const propertyJson = await propertyQuery.json();
    propertyWebsite = propertyJson.data
  }
  return {
    props: {
      propertyWebsite
    }
  }

}
export default Create