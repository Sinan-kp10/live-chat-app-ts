import React, { useState } from "react"

interface NameModelProps {
    onJoin : (name : string) => void
}
function NameModal ({onJoin} : NameModelProps){

    const [name , setName] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault()

        const trimmedName = name.trim()

        if(!trimmedName){
            setError("Pleas Enter Your Name")
            return
        }
        if (trimmedName.length < 3) {
            setError("Name must be at least 3 characters")
            return
        }
        onJoin(trimmedName)
    }

    return (
        <div>
            <h2>Welcome to Live Chat 👋</h2>
            <form onSubmit={handleSubmit}>

                <input type="text" id="name" placeholder="Enter Your Name" value={name} onChange={(e)=> {
                    setName(e.target.value) 
                    setError("")}
                } />
                {error && <p>{error}</p>}
                
                <button type="submit">Join Chat</button>
            </form>

        </div>
    )
}

export default NameModal