import React, { useState, useEffect, } from 'react';
import { FormControl,IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import FlipMove from 'react-flip-move';
import { useAuth } from './AuthContext';
import { auth } from './firebase';

import InputEmoji from 'react-input-emoji';

import { addDoc, onSnapshot, collection, query, Timestamp, orderBy } from "firebase/firestore";
import './App.css';
import { database } from './firebase';
import Messages from './messages';
import { useNavigate } from 'react-router-dom';

function MessageUI() {
    const [input, setinput] = useState("");
    const history = useNavigate();
    const [messages, setmessages] = useState([])
    const [UID, setUID] = useState("");
    const [photoURL, setphotoURL] = useState("");
    const [Username, setUsername] = useState("");

    const { user } = useAuth();
    const handleLogout = async () => {
        await auth.signOut();
        history('/')
    }


    useEffect(() => {
        const colRef = collection(database, "messages");
        const q = query(colRef, orderBy('timestamp', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setmessages(querySnapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })));


        })
    })


    useEffect(() => {
        setUsername(user.displayName);
        setUID(user.uid);
        setphotoURL(user.photoURL);
    },[user])

    const sendMessage = (event) => {

        event.preventDefault();
        try {
            addDoc(collection(database, "messages"), {
                username: Username,
                message: input,
                uid: UID,
                photourl: photoURL,
                timestamp: Timestamp.fromDate(new Date())
            });
            setinput("")
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div >
            <div className='App'>
                <img className='profilePhoto' src={photoURL} alt='icon' />
                <h1> OVO Messenger</h1>
                <span className='app__name'>Welcome {Username}</span>
                <IconButton className='app__iconButton' variant='contained' color='primary' onClick={handleLogout} >
                    <LogoutIcon />
                </IconButton>
            </div>
            <div className='App__message__box'>
                <FlipMove>
                    {messages.map(({ id, message }) => (
                        <Messages key={id} UID={UID} message={message} />
                    ))}
                </FlipMove>
            </div>
            <br/>
            <form className='app__form'>
                <FormControl className='app__formControl'>
                    <InputEmoji className='app__input' placeholder='Enter a message' value={input} onChange={setinput} type='submit' />
                    <IconButton className='app__iconButton' disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage} >
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>


        </div>
    );
}

export default MessageUI;
