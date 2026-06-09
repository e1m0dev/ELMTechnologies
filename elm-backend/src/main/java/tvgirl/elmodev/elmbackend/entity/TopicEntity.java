package tvgirl.elmodev.elmbackend.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "topics")
public class TopicEntity {
    // Пример: 777 | Транзистор, что это такое? Категория: Электроника. Быстрый ответ: Это электронное устройство управления током
    // состоящее из P-N-P или N-P-N переходов. Автор: ELMoDev. Дата: 07.07.1777;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

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
    Instant createdAt;

    protected TopicEntity() {

    }

    public TopicEntity(String question, String answer, String author, String content, String category) {
        this.question = question;
        this.answer = answer;
        this.author = author;
        this.content = content;
        this.category = category;
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public String getAuthor() {
        return author;
    }

    public String getContent() {
        return content;
    }

    public String getCategory() {
        return category;
    }

    public Instant getDate() {
        return createdAt;
    }
}
