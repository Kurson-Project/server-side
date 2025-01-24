import {Request, Response} from "express"

const privateAxios = async (url : string) => {
    const data:any = await fetch(url,{method : "GET", headers : {"Content-Type" : "application/json"}})
    return await data.json()
}

export const homepage = async (request : Request,response : Response) => {
    const sideProjectData = await privateAxios("https://api.github.com/repos/Kurson-Project/server-side")
    const lastCommit = await privateAxios("https://api.github.com/repos/Kurson-Project/server-side/commits")
    const request_data = {
        nama_project : sideProjectData.full_name,
        project_private : sideProjectData.private,
        bahasa : sideProjectData.language,
        dibuat : sideProjectData.created_at,
        update_terbaru : sideProjectData.updated_at,
        commit_terbaru : [{
            nama_committer : lastCommit[0]?.commit.committer.name,
            email_commiter : lastCommit[0]?.commit.committer.email,
            tanggal : lastCommit[0]?.commit.committer.date,
            pesan_commit : lastCommit[0]?.commit.message,
            verification : lastCommit[0]?.commit.verification
        }]
    }
    console.log(lastCommit[0])
    response.json(request_data)
}