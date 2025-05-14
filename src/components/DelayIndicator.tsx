import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext';
import { httpClient } from '../config/httpClient';
import { toast } from 'react-toastify';

export const DelayIndicator = () => {
    const [delay, setDelay] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const socket = useSocket();

    useEffect(() => {
        socket.on("delay", (message) => {
            setDelay(message.delay);
        });

        return () => {
            socket.off("delay");
        };

    })

    const closeModal = (e?:React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        e && e.stopPropagation();
        setIsModalOpen(false);
        console.log(isModalOpen)
    }
    return (
        <div className="flex items-center gap-2 bg-blue-200 p-3 rounded shadow hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={() => {
                console.log('click');
                setIsModalOpen(true);
            }
            }>
            <span className=" font-semibold text-gray-600">Atraso:</span>
            <span className="font-semibold text-red-600">{delay} Min</span>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
    )
}

type ModalProps = {
    isOpen: boolean;
    onClose: (e?: React.MouseEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {
    const [delay, setDelay] = useState(0);

    const handleSave = () => {
        httpClient.get('/delay/' + delay)
            .then((response) => {
                toast.success('Atraso atualizado com sucesso!');
            })
            .catch((error) => {
                toast.error('Erro ao atualizar o atraso.');
            })
            .finally(() => {
                onClose();
            }
            )

            ;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDelay(Number(value));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <h2 className="text-xl font-semibold mb-4">Atraso de pedidos</h2>
                <p>Insira o novo atraso em minutos:</p>
                <input onChange={handleChange} min={1} type="number" className="border border-gray-300 rounded p-2 w-full mt-2" />
                <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Salvar</button>
            </div>
        </div>
    );
}
