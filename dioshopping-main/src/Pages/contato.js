import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);
    const [messageEdit, setMessageEdit] = useState(false);
    const [atualiza, setAtualiza] = useState(false);
    const [apaga, setApaga] = useState(false);

    useEffect(async () => {
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);
    }, [render])

    const sendMessage = () => {
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        }
        const bodyForm = {
            email: author,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.id) {
                /* setRender(true); */
                setRender(!render);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 5000)
            }
        })
        
        setAuthor('');
        setContent('');
    }

    const editMessage = (id) => {
        /*setValidator(false);
         if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        } */
        const bodyForm = {
            id: id,
            email: newEmail,
            message: newMessage,
        }

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        .then((response) => response.json())
        .then((data) => {
        
            if(data.id) {
                /* setRender(true); */
                setRender(!render);
                setAtualiza(true);
                setTimeout(() => {
                    setAtualiza(false);
                }, 5000)
            }
        })
        
        setAuthor('');
        setContent('');
        hideEdit();
    }

    const deleteMessage = (id) => {
        
        const bodyForm = {
            id: id
        }

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        .then((response) => response.json())
        .then((data) => {
        
            //if(data.id) {
                setRender(!render);
                setApaga(true);
                setTimeout(() => {
                    setApaga(false);
                }, 5000)
            //}
        })
        
        setAuthor('');
        setContent('');
        hideEdit();
    }

    const showEdit = (id, email, message) => {
        setMessageEdit(id);
        setNewEmail(email);
        setNewMessage(message);
    }
    
    const hideEdit = () => {
        setMessageEdit(-1);
        setNewEmail('');
        setNewMessage('');
    }

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth/>
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth/>
            </Grid>

            {validator && 
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {success && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada</strong>
                </div>
            }

            {atualiza && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem atualizada</strong>
                </div>
            }

            {apaga && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem apagada</strong>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Sent
            </Button>

            {message.map((content) => {
                return(
                    <div className="card mt-2" key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                            <button className="btn btn-success btn-sm rounded-0" type="button"  data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => showEdit(content.id, content.email, content.message)}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm rounded-0" type="button"   data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => deleteMessage(content.id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>

                        {messageEdit == content.id &&
                            <>
                                <Grid container direction="row" xs={12}>
                                    <TextField id="name" label="Name" value={newEmail} onChange={(event)=>{setNewEmail(event.target.value)}} fullWidth/>
                                    <TextField id="message" label="Message" value={newMessage} onChange={(event)=>{setNewMessage(event.target.value)}} fullWidth/>
                                    <Button onClick={() => editMessage(messageEdit)} className="mt-2" variant="contained" color="primary">
                                        Editar
                                    </Button>
                                    <Button onClick={() => hideEdit()} className="mt-2" variant="contained" color="secondary">
                                        Cancelar
                                    </Button>
                                </Grid>
                                
                            </>
                            
                        }
                    </div>
                )
            } )}
        </>
    )
}

export default Contatos;
