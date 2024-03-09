import { useParams } from "react-router-dom";
import { useState } from "react";

function UpdateBlog() {
    const {id} = useParams()
    console.log(id)
  return (
    <div>UpdateBlog</div>
  )
}

export default UpdateBlog