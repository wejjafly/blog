import { useState } from 'react';
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../db';

 export const UserPosts = ({id, title, content, email, refreshList}) => {
    const [ editMode, setEditMode ] = useState(false);
    const [ inputTitle, setInputTitle] = useState(title);
    const [ inputContent, setInputContent ] = useState(content);
    const [ inputEmail , setInputEmail ] = useState(email);

    const handleClickEdit = () => {
        setEditMode(prev => !prev);
    };

    const editPost = async () => {
        const title = inputTitle;
        const content = inputContent;
        const email = inputEmail;

        await setDoc(doc(db, 'posts', id), {
            title: title,
            content: content,
            email: email
        });
        setEditMode(false);
        refreshList();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editPost();

    }
    const handleClickDelete = async () => {
        const title = inputTitle;
        const content = inputContent;
        const email = inputEmail;
        await deleteDoc(doc(db, 'posts', id), {
            title,
            content,
            email
        });
        refreshList();
    }
    return (
        <div>
            {!editMode ? <>
            <div>
                {title}
            </div>
            <div>
                {content}
            </div>
            <div>
                {email}
            </div></>
            : <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        value={inputTitle} 
                        placeholder="Tytuł posta" 
                        onChange={(e) => setInputTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={inputContent} 
                        placeholder="treść" 
                        onChange={(e) => setInputContent(e.target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={inputEmail} 
                        placeholder="email" 
                        onChange={(e) => setInputEmail(e.target.value)} 
                    />
                </div> 
                <button type="submit">Zapisz zmiany</button>
            </form>}
            <button onClick={handleClickEdit}>{editMode ? 'Zamknij edycje' : 'Edytuj'}</button>
            <button onClick={handleClickDelete}>Usuń post</button>
            <hr />
        </div>
    )
}

