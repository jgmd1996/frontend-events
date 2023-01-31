import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

function BandList() {

    const [itens, setItens] = useState([]);

    console.log(itens);
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    const redirect = (item) => {
        navigate('/UpdateBand', { replace: false, state: { item: item } });//
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/band")
            const body = await response.json()
            setItens(body.bands)
        }
        fetchMyAPI()
    }, [refreshPage]);

    async function deletarCategoria(id) {
        let result = await fetch("http://localhost:3001/band/" + id, {
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
                        <td>Menbros</td>
                        <td>contato</td>
                        <td>E-mail</td>
                        <td>Logo</td>
                        <td>imagem da banda</td>
                        <td>publico alvo</td>
                        <td>cache</td>
                        <td>ID</td>
                        <td>Genero</td>
                        <td>Atualizar</td>
                        <td>Deletar</td>
                    </tr>
                    {itens.map(item => {

                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item.numberMembers}</td>
                            <td style={{ border: "1px solid" }}>{item.contact}</td>
                            <td style={{ border: "1px solid" }}>{item.email}</td>
                            <td style={{ border: "1px solid" }}>{item.logo}</td>
                            <td style={{ border: "1px solid" }}>{item.bandPhoto}</td>
                            <td style={{ border: "1px solid" }}>{item.targetAudience}</td>
                            <td style={{ border: "1px solid" }}>{item.cache}</td>
                            <td style={{ border: "1px solid" }}>{item._id}</td>
                            <td style={{ border: "1px solid" }}>{item.genre.map(io => io.name)}</td>
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

export default BandList;