import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RedirectPages from '../../components/RedirectPages';
import "./style.css";

function EvetList() {

    const [itens, setItens] = useState([]);
    console.log(itens)
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/UpdateEvent', { replace: false, state: { item: item } });//
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/event")
            const body = await response.json()
            setItens(body.events)
        }
        fetchMyAPI()
    }, [refreshPage]);

    async function deleteEvent(id) {
        let result = await fetch("http://localhost:3001/event/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        });
        result = await result.json();
        console.warn(result);
        setRefreshPage(result);
    };

    return (
        <div>
            <table style={{ border: "1px solid" }}>
                <tbody>
                    <tr>
                        <td>Nome</td>
                        <td>endereço</td>
                        <td>local de apresentação</td>
                        <td>publico alvo</td>
                        <td>cache</td>
                        <td>instrumentos da banda</td>
                        <td>Publico alvo</td>
                        <td>ID</td>
                        <td>Evento</td>
                        <td>Atualizar</td>
                        <td>Deletar</td>
                    </tr>
                    {itens.map(item => {

                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.address}</td>
                            <td style={{ border: "1px solid" }}>{item.presentationLocation}</td>
                            <td style={{ border: "1px solid" }}>{item.targetAudience}</td>
                            <td style={{ border: "1px solid" }}>{item.cache}</td>
                            <td style={{ border: "1px solid" }}>{item.bandInstruments}</td>
                            <td style={{ border: "1px solid" }}>{item.expectedAudience}</td>
                            <td style={{ border: "1px solid" }}>{item._id}</td>
                            <td style={{ border: "1px solid" }}>{item.band.map(io => io.name)}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteEvent(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <RedirectPages linkPage="/" page="Voltar para Home"/>
        </div>


    );
}

export default EvetList;