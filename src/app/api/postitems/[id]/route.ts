// bagian delete edit guys

import PostItem from "../../../../../models/PostItem";

export async function DELETE(
    request: Request,
    {params}: {params:{id:string}}
){
    try{
        const postItem = await PostItem.findByIdAndDelete(params.id);
        if(!postItem)
        return new Response(JSON.stringify({
            message: 'post not found'
        }), {
            status: 404,
        });
        return new Response(JSON.stringify(postItem), {
            status: 200,
        });
    }catch(error){
        return new Response(JSON.stringify({
            message: 'server error'
        }), {
            status: 500,
        });
    }
}
