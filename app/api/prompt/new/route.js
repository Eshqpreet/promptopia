import { connecttoDB } from "@utils/database";
import Prompt from "@models/Prompt";
export const POST=async(req)=>{
    const {userId,prompt,tag}=await req.json();
    try{
        await connecttoDB();
        const newprompt= new Prompt({
            creator:userId,
            prompt,
            tag
        })
        await newprompt.save();
        return new Response(JSON.stringify(newprompt), { status: 201 })
    }catch(err){
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}