import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);
    const [edit, setEdit] = useState(-1);
    const [newAuthor, setNewAuthor] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [update, setUpdate] = useState(false);
    const [apaga, setApaga] = useState(false);

    useEffect(async () => {
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);
    }, [render])

    /* useEffect(async () => {
        console.log("Edit Message com effect: " + edit);
    }, [edit]) */

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
                //setRender(true);
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

    //const editMessage = (id, email, message) => {
    const editMessage = (id) => {
        /*setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        }*/
        
        const bodyForm = {
            id: id,
            /* email: email,
            message: message, */
            email: newAuthor,
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
                //setRender(true);
                setRender(!render);
                setSuccess(false);
                setUpdate(true);
                setTimeout(() => {
                    setUpdate(false);
                }, 5000)
                console.log(data.id);
            }
        })

        hideEdit();
        setAuthor('');
        setContent('');
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
                //setRender(true);
                setRender(!render);
                setSuccess(false);
                setApaga(true);
                setTimeout(() => {
                    //setSuccess(false);
                    setApaga(false);
                }, 5000)
            //}
        })
        setAuthor('');
        setContent('');
    }

    const showEdit = (id, email, message) => {
        if(edit == -1) {
            setNewAuthor(email);
            setNewMessage(message);
            setEdit(id);
        }
    }

    const hideEdit = () => {
        setNewAuthor("");
        setNewMessage("");
        setEdit(-1);
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
            
            {apaga && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem apagada</strong>
                </div>
            }
            
            {update && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem alterada</strong>
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
                            {/* <button className="btn btn-success btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => editMessage(content.id, content.email, content.message)} >
                                <i className="fa fa-edit"></i>
                            </button> */}
                            {<button className="btn btn-success btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => showEdit(content.id, content.email, content.message)} >
                                <i className="fa fa-edit"></i>
                            </button>}
                            <button className="btn btn-danger btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => deleteMessage(content.id)} >
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                        {edit == content.id && 
                            <>
                                <Grid container direction="row" xs={12}>
                                    <TextField id="newName" label="Name" value={newAuthor} onChange={(event)=>{setNewAuthor(event.target.value)}} fullWidth/>
                                    <TextField id="newMessage" label="Message" value={newMessage} onChange={(event)=>{setNewMessage(event.target.value)}} fullWidth/>
                                    <Button onClick={() => editMessage(edit)} className="mt-2" variant="contained" color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => hideEdit()} className="mt-2" variant="contained" color="secondary">
                                    Cancel
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
