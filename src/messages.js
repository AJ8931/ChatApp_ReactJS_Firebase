import React, { forwardRef } from 'react'
import { Card, Typography } from '@mui/material';
import moment from 'moment';
import './message.css'

const Messages = forwardRef(({ message, UID }, ref) => {
    const isUser = UID === message.uid;
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>


            <Card
                className={isUser ? "message__userCard" : "message__guestCard "} >
                {!isUser ? <img className='profile__Pic' src={message.photourl} alt="" /> : ""}

                <span>{!isUser && `${message.username || "Unknown"}: `}</span>
                <Typography
                    style={{
                        wordWrap: "break-word",
                        fontSize: "medium"
                    }}
                    p={1}
                    color="black"
                    variant="h6"
                    component="h2"
                >
                    {message.message}
                </Typography>
            </Card>
            {<span className='Message__Time'>
                {moment(message.timestamp.toDate()).calendar()
                }
            </span>}
        </div>
    );
})

export default Messages