import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function GenreList() {
    
    const [itens, setItens] = useState([])
    const navigate = useNavigate();
    const [refreshGage, setRefreshGage] = useState('');

    
    const redirect = (item) => {
        navigate('/updateGenre', { replace: false, state: { item: item } });
    };

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/genre");
            const genres = await response.json();
            setItens(genres);
        }
        fetchMyAPI()
    }, [refreshGage]);

    async function deleteGenre(id) {
        let result = await fetch("http://localhost:3001/genre/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        });
        result = await result.json();
        console.warn(result);
        setRefreshGage(result);
    };
    return (
        <div>
            <table style={{ border: "1px solid" }}>
                <tbody>

                    <tr>
                        <td>Nome</td>
                        <td>Id</td>
                        <td>Atualizar</td>
                        <td>Deletar</td>
                    </tr>

                    {itens.map(item => {
                        return <tr key={item._id} style={{ border: "1px solid" }}>
                            <td style={{ border: "1px solid" }}>{item.name}</td>
                            <td style={{ border: "1px solid" }}>{item._id}</td>
                            <td style={{ border: "1px solid" }}><button onClick={() => redirect(item)}>Atualizar</button> </td>
                            <td style={{ border: "1px solid" }}><button onClick={() => deleteGenre(item._id)}>Deletar</button> </td>
                        </tr>
                    })}

                </tbody>
            </table>
            <Link to="/">Voltar para pagina inicial</Link>
        </div>
    );
}

export default GenreList;