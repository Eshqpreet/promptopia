"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@components/Profile"

const UserProfilepage = ({params}) => {
   
    const [posts,setPosts]=useState([]);
    const SearchParams = useSearchParams();
    const name = SearchParams.get("name");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(params?.id)fetchPosts();
        
    }, [params.id]);
    const handleEdit = async (post) => {
        
    }
    const handleDelete = async (post) => {
        
    }
    return (
        <Profile name={name} desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`} data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
    )
}

export default UserProfilepage