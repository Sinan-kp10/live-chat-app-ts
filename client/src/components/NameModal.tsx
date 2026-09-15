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
            setError("Please enter your name")
            return
        }
        if (trimmedName.length < 3) {
            setError("Name must be at least 3 characters")
            return
        }
        onJoin(trimmedName)
    }

    return (
        <div className="name-modal-overlay">
            <div className="name-modal-card">
                <div className="name-modal-header">
                    <div className="name-modal-icon">💬</div>
                    <h2 className="name-modal-title">Welcome to Live Chat</h2>
                    <p className="name-modal-subtitle">Enter your name or nickname to join the room</p>
                    <div className="name-modal-ttl-badge">
                        <span className="ttl-badge-icon">⏱️</span>
                        <span>Messages automatically disappear after 24 hours</span>
                    </div>
                </div>
                <form className="name-modal-form" onSubmit={handleSubmit}>
                    <div className="name-modal-input-group">
                        <input
                            type="text"
                            id="name"
                            className="name-modal-input"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError("");
                            }}
                            autoFocus
                        />
                        {error && <p className="name-modal-error">{error}</p>}
                    </div>

                    <button type="submit" className="name-modal-btn">
                        Join Chat
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NameModal