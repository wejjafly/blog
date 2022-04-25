import { useState } from 'react';
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../db';


 export const AddPosts = ({ refreshList }) => {
    const [ inputTitle, setInputTitle] = useState('');
    const [ inputContent, setInputContent ] = useState('');
    const [ inputEmail , setInputEmail ] = useState('');

    const addPostUsers = async () => {
        const title = inputTitle;
        const content = inputContent;
        const email = localStorage.getItem('user');
        await setDoc(doc(db, 'posts', `${title}-${content}-${email}`), {
            title: title,
            content: content,
            email: email
        });
        setInputTitle('');
        setInputContent('');
        setInputEmail('');
        refreshList();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addPostUsers();
    }
    

    return (
        <div>
            <h1>Dodaj nowy post</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={inputTitle} 
                    placeholder="tytul" 
                    onChange={(e) => setInputTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    value={inputContent} 
                    placeholder="content" 
                    onChange={(e) => setInputContent(e.target.value)} 
                />
                
                <button type="submit">Dodaj post</button>
                
            </form>
        </div>
    )
}

