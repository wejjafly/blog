import { signOut } from 'firebase/auth';
import { auth } from '../db';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db';
import { onAuthStateChanged } from "firebase/auth";
import {AddPosts} from "../components/AddPosts"
import {UserPosts} from "../components/UserPosts"


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
      console.log({posts})
    };

    const userLogin = localStorage.getItem('user');
  
    useEffect(() => {
        getPosts();
    }, []);
    const renderUsers = () => posts.filter(element => element.data.email === userLogin).map( element => (
        <UserPosts 
          key={element.id}
          id={element.id} 
          title={element.data.title}
          content={element.data.content}
          email={userLogin}
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