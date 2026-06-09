import { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

import "./css/CreateTopic.css";
import {useNavigate} from "react-router";

const CustomImage = Image.extend({

    addAttributes() {
        return {

            ...this.parent?.(),

            class: {
                default: "image-left",

                renderHTML: attributes => {
                    return {
                        class: attributes.class
                    };
                }
            }
        };
    }
});

export function CreateTopic() {

    const nav = useNavigate();

    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const isQuestionTouched = question.length > 0;
    const isCategoryTouched = category.length > 0;
    const isAnswerTouched = answer.length > 0;
    const isContentTouched = content.length > 0;

    const answerQuery = answer.length >= 256;
    const questionQuery = question.length >= 256;
    const contentQuery = content.length >= 8128;

    const isFormValid =
        !answerQuery &&
        !questionQuery &&
        !contentQuery &&
        category.trim() !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isFormValid) {
            console.log("Ошибка, у Вас не правильная форма!");

            return (
                <h1>Ошибка, у Вас не правильная форма!</h1>
            )
        }

        const requestBody = {
            question,
            answer,
            category,
            author: "ELMoDev",
            content: editor.getHTML()
        };

        const response = await fetch("https://elmtechnologies-1.onrender.com/api/topic", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.log("Ошибка");
            return;
        }

        setQuestion("");
        setCategory("");

        nav("/topics")

        console.log(requestBody)
        console.log(response)

        editor.commands.clearContent();
    };


    const addImage = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) {
                return;
            }

            const formData = new FormData();
            formData.append(
                "file",
                file
            );

            const response = await fetch(
                "https://elmtechnologies.onrender.com/api/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                console.log("Ошибка загрузки");
                return;
            }

            const data = await response.json();

            editor.chain()
                .focus()
                .setImage({
                    src: data.url
                })
                .run();
        };
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            CustomImage,
            Placeholder.configure({
                placeholder: "Напишите что-нибудь..."
            }),

            TextAlign.configure({
                types: ['heading', 'paragraph'],
                renderHTML: attributes => {
                    if (!attributes.textAlign) {
                        return {}
                    }

                    return {
                        align: attributes.textAlign,
                    }
                },
                parseHTML: element => element.getAttribute('align'),
            })
        ],
        content: "",
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        }
    });

    {isContentTouched && !contentQuery && <p>Ошибка, текст не должен быть больше 4096</p>}

    if (!editor) {
        return null;
    }

    return (
        <div className="topic__create">

            <form onSubmit={handleSubmit}>


                <div className="topic__createSpace">
                    <input
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value)}
                        }
                        placeholder="Введите тему"
                    />

                    {isQuestionTouched && questionQuery && <p>Ошибка! Вопрос не может быть больше чем 256 символов.</p>}

                    <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Короткий ответ"
                    />

                    {isAnswerTouched && answerQuery && <p>Ошибка! Вопрос не может быть больше чем 256 символов.</p>}

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Выберите категорию</option>

                        <option value="Электроника">
                            Электроника
                        </option>

                        <option value="Импульсная техника">
                            Импульсная техника
                        </option>

                        <option value="Микросхемы">
                            Микросхемы
                        </option>
                    </select>

                </div>

                <div className="toolbar">
                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        B
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        I
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        S
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        • Лист
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        1. Лист UL
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                        }
                    >
                        Код
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                    >
                        Памятка
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setParagraph().run()
                        }
                    >
                        P
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        }
                    >
                        H1
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        }
                    >
                        H2
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 3 }).run()
                        }
                    >
                        H3
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 4 }).run()
                        }
                    >
                        H4
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 5 }).run()
                        }
                    >
                        H5
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                        }
                    >
                        Слева
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                        }
                    >
                        По центру
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                        }
                    >
                        Справа
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("justify").run()
                        }
                    >
                        По ширине
                    </button>

                    <button
                        type="button"
                        onClick={addImage}
                    >
                        Фото
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().undo().run()
                        }
                    >
                        Отмена
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor.chain().focus().redo().run()
                        }
                    >
                        Отмена отмены :3
                    </button>

                </div>

                {isContentTouched && contentQuery && (
                    <p>
                        Ошибка! Текст статьи не должен превышать 4096 символов.
                    </p>
                )}


                <EditorContent
                        editor={editor}
                        className="editor"
                    />

                <div className="topic__footerButtons">
                    <button type="submit">
                        Создать тему
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .updateAttributes("image", {
                                    class: "image-center"
                                })
                                .run()
                        }
                    >
                        Center Image
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .updateAttributes("image", {
                                    class: "image-left"
                                })
                                .run()
                        }
                    >
                        Left Image
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .updateAttributes("image", {
                                    class: "image-right"
                                })
                                .run()
                        }
                    >
                        Right Image
                    </button>
                </div>
            </form>
        </div>
    );
}
