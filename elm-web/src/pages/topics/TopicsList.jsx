import './App.css'
import {useEffect, useState} from "react";

function App() {

    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/topic")
            .then(response => response.json())
            .then(data => {
                setTopics(data)
            })

        setLoading(false)
    }, []);

    return (
        <div>
            {loading && <p>Loading ⌛</p>}

            
            <h1>Elmo!</h1>

            {topics.map((item, index) => (
                <div className="topics__list" key={index}>
                    <p>{item.question}</p>
                    <p>{item.category}</p>
                    <p>{item.answer}</p>
                    <p>{item.author}</p>
                    <p>{item.data}</p>
                </div>
            ))}
        </div>
    )
}

export default App
