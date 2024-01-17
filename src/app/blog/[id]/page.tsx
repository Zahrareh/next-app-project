const PostPage = ({params}:{params:{id:string}})=>{
    return(
        <>
            <h2>Post Page</h2>
            <div>{params.id}</div>
        </>
    )
}
export default PostPage;