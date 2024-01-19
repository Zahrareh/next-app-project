"use client"
import React, { useEffect, useState } from "react";

interface IPost {
  id: number;
  title: string;
}

const PostList = () => {
  const [data, setData] = useState<IPost[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts: IPost[] = await response.json();
        setData(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
