import { useEffect, useState } from "react"
import axios from "axios";

const Admin = () => {

    const [users,setUsers] = useState([])


    useEffect(()=>{
          fetch('http://localhost:9875/users/all')
          .then(resp => resp.json())
          .then(json => setUsers(json))
    },[users])

    const setAdmin = (e) => {
        const email = e.target.value
        const id = e.target.id
        axios.post("http://localhost:9875/users/admin", {email,isAdmin:!users[id].isAdmin})
            .then(response => {
                const update = response.data
                const utilisateurs = users
                utilisateurs[id] = update
                setUsers(utilisateurs)
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteUser = (e) => {
        const id = e.target.id
        axios.post("http://localhost:9875/users/delete", {id})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div>
            <h2>Page d'administration</h2>
            <section>
                <h3>Utilisateurs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>numéro</th>
                            <th>email</th>
                            <th>administrateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,i)=> {
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "oui" : "non"}</td>
                                    {!user.isAdmin ? (
                                        <td><button value={user.email} id={i} onClick={setAdmin}>RENDRE ADMIN</button></td>
                                    ):(
                                        <td><button value={user.email} id={i} onClick={setAdmin}>RETIRER ADMIN</button></td>
                                    )
                                    }
                                    <td><button value={user.email} id={user._id} onClick={deleteUser}>SUPPRIMER</button></td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                    
                </table>
            </section>
            
        </div>
    )
}

export default Admin