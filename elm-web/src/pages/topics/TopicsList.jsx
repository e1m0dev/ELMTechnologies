import './css/Topics.css'
import {Link, useNavigate} from "react-router";
import {useTopic} from "../api/topicsAPI.js";

export function TopicsList() {

    const {topics, loading} = useTopic();
    const navigate = useNavigate()

    function navigateToTopic(category, id) {
        navigate(`/topics/${category}/topic/${id}`);
    }

    return (
        <div className="topics__div">

            <header>

                <Link to={"/create-topic"}>
                    <button className="button__create">Хотим что либо создать Эльм?</button>
                </Link>
            </header>

            <main>
                {topics.length === 0 && <h1 className="topics_listError">Топиков пока нет.. 🌉</h1>}

                {topics.map((item) => (
                    <div onClick={() => {navigateToTopic(item.category, item.id)}} className="topics__list" key={item.id}>
                        <h4 className="topics__question">Вопрос: {item.question}</h4>
                        <h4>ID: {item.id}</h4>
                        <h4>Категория: {item.category}</h4>
                        <h4>Короткий ответ: </h4>
                        <h4 className="topics__answer">{item.answer}</h4>

                        <p>Автор: {item.author}</p>
                    </div>
                ))}
            </main>

            <footer>
                {loading && <p className="loading__text">Прошу подождать, это может занять больше минуты, а возможно и больше, напоминаю хост шедевр. Можете пока пойти заварить кофе я не знаю ._.</p>}
            </footer>
        </div>
    )
}