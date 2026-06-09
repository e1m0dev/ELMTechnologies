package tvgirl.elmodev.elmbackend.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "topics")
public class TopicEntity {
    // Пример: 777 | Транзистор, что это такое? Категория: Электроника. Быстрый ответ: Это электронное устройство управления током
    // состоящее из P-N-P или N-P-N переходов. Автор: ELMoDev. Дата: 07.07.1777;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Question", nullable = false) // Сам вопрос.
    String question;

    @Column(name = "Answer", nullable = false, columnDefinition = "TEXT")
    String answer;

    @Column(name = "Author", nullable = false, columnDefinition = "TEXT")
    String author;

    @Column(name = "Content", nullable = false, columnDefinition = "TEXT")
    String content;

    @Column(name = "Category", length = 64, nullable = false)
    String category;

    @Column(name = "Date")
    Instant data;
}
