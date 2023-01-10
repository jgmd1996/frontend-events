import React from 'react';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ListaCategoria() {
    
    const [itens, setItens] = useState([])
    const navigate = useNavigate();
    const [atualizarPagina, setAtualizarPagina] = useState('');

    const redirect = (item) => {
        navigate('/atualizarcategoria', { replace: false, state: { item: item } });
    };

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch("http://localhost:3001/categories");
            const categories = await response.json();
            setItens(categories);
        }
        fetchMyAPI()
    }, [atualizarPagina]);

    async function deletarCategoria(id) {
        let result = await fetch("http://localhost:3001/categories/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            }
        });
        result = await result.json();
        console.warn(result);
        setAtualizarPagina(result);
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
                            <td style={{ border: "1px solid" }}>{item.nome}</td>
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

export default ListaCategoria;