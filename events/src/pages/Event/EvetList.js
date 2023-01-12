import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

function EvetList() {
    const [itens, setItens] = useState([]);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/UpdateEvent', { replace: false, state: { item: item } });//
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/event")
            const events = await response.json()
            setItens(events)
        }
        fetchMyAPI()
    }, [refreshPage]);

    async function deletarCategoria(id) {
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
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deletarCategoria(item._id)}>Deletar</button> </td>

                        </tr>
                    })}
                </tbody>
            </table>
            <Link to="/">home</Link>
        </div>


    );
}

export default EvetList;