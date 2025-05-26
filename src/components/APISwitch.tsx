import { Switch } from '@mui/material'
import React, { useEffect } from 'react'
import { useSocket } from '../context/SocketContext';
import { httpClient } from '../config/httpClient';

export const APISwitch = () => {
    const socket = useSocket();
    const [ enabled, setEnabled ] = React.useState(false);

    useEffect(() => {
        socket.on("apiEnabled", (message: { enabled: boolean }) => {
            setEnabled(message.enabled);
        });
        return () => {
            socket.off("api");
        };
    }, [socket]);

    const handleChange = async () => {
        const res = await httpClient.get("/enableApi");
        if (res.status === 200) {
            setEnabled(res.data.enabled);
        } else {
            console.error("Error ao habilitar/desabilitar a API");
        }
    };

    return (
        <Switch checked={enabled} onChange={handleChange}  />
    )
}
