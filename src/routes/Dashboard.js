import { signOut } from 'firebase/auth';
import { auth } from '../db';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db';
import UserPosts from '../UserPosts';
import AddPosts from '../AddPosts';
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = ({ user }) => {

    const signoutUser = () => {
        signOut(auth);
    }
    const [ posts, setPosts ] = useState([]);

    const [isAuth, setIsAuth] = useState(false);
  
  onAuthStateChanged(auth, (user) => {
    console.log('auth changed');
    if (user) {
      setIsAuth(user.email);
    } else {
      setIsAuth(false);
    }
  });
    const getPosts = async () => {
      const usersCollection = collection(db, 'posts'); 
      const usersDocuments = await getDocs(usersCollection); 
  
      const usersList = usersDocuments.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
  
      setPosts(usersList);
    };
  
    useEffect(() => {
        getPosts();
    }, []);
    const renderUsers = () => posts.map( element => (
        <UserPosts 
          key={element.id}
          id={element.id} 
          title={element.data.title}
          content={element.data.content}
          email={user}
          refreshList={getPosts}
          user={isAuth}
        />
      ));  
  
    return (
        <div>
            <h1>Hello</h1>
            <div>Jesteś zalogowany jako: {user} <button onClick={signoutUser}>Wyloguj</button></div>
            <div >         
      <AddPosts refreshList={getPosts} />
      {renderUsers()}
    </div>
        </div>
    )
}

export default Dashboard;