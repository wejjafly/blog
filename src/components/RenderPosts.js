import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../db";
import { Gallery } from "./Gallery";

export const RenderPosts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const postsCollection = collection(db, "posts");
    const postsDocs = await getDocs(postsCollection);

    const posts = postsDocs.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    console.log(posts);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderPosts = () =>
    posts.map((el) => (
      <div className="allPosts" key={el.id}>
        <h2 className="allPosts"> {el.data.title} </h2>
        <p className="allPosts">{el.data.content}</p>
        <Gallery />
        <p className="userPosts">{el.data.email}</p>
      </div>
    ));

  return <>{renderPosts()}</>;
};