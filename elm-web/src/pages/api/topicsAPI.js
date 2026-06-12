import {useEffect, useState} from "react";

export function useTopic() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadTopics() {
            try {
                setLoading(true);
                setErrorMessage("");

                const response = await fetch(
                    "https://elmtechnologies.onrender.com/api/topic",
                    // "http://localhost:8080/api/topic",
                    {
                        signal: controller.signal
                    }
                );

                const data = await response.json();

                setTopics(data);

            } catch (error) {
                if (error.name !== "AbortError") {
                    setErrorMessage(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadTopics();

        return () => {
            controller.abort();
        };
    }, []);

    return {
        topics,
        setTopics,
        loading,
        errorMessage
    }
}