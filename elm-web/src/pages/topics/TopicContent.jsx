import {useParams} from "react-router";
import {useTopic} from "../api/topicsAPI.js";

import './css/TopicContent.css'

export function TopicContent() {
    const { category, id } = useParams();
    const { topics } = useTopic();

    const topic = topics.find((item) => item.id === id)

    if (!topic) {
        return <h1>Топик загружается...</h1>;
    }

    return (
        <>
            <div className="topic__header">
                <h1>Категория: {category} | ID: {id}</h1>
                <h1>Точный топик: {topic.question}</h1>
            </div>

            <div className="topic__content">
                <div
                    dangerouslySetInnerHTML={{
                        __html: topic.content
                    }}
                />
            </div>
        </>
    );
}
