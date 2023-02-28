import { useEffect, useState } from "react"

const Admin = () => {

    const [users,setUsers] = useState([])

    useEffect(()=>{
          fetch('http://localhost:9875/users/all')
          .then(resp => resp.json())
          .then(json => setUsers(json))
    },[])

    useEffect(()=> {
        console.log(users)
    },[users])

    return (

        <>
            <h2>Page d'administration</h2>

        </>
    )
}

export default Admin