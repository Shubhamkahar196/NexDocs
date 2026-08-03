import { del, put } from "@vercel/blob";

export async function uploadToBlob(
    file:File,
    organizationId: string,
    userId:string
):Promise<{url:string; pathname:string}>{

    try {
        const filename= `${Date.now()}-${file.name.replace(/\s+/g,"-")}`;
        const pathname = `org-${organizationId}/user-${userId}/${filename}`

        const blob = await put(pathname,file,{
       access: "public",
       token:process.env.BLOB_READ_WRITE_TOKEN,
        })

        return {
            url: blob.url,
            pathname: blob.pathname
        }
    } catch (error) {
        console.error("uploadTOblob error",error)
        throw Error("failed to upload to blob")
    }
}


export async function deleteToBlob(url:string):Promise<void>{
    try {
        await del(url,{
            token:process.env.BLOB_READ_WRITE_TOKEN,
        })
    } catch (error) {
        console.error("Blog delete error",error);
        throw Error("Failed to delete the blob")
    }
}