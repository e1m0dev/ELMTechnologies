package tvgirl.elmodev.elmbackend.fetch;

public record TopicRequest(
        String question,
        String answer,
        String author,
        String content,
        String category
) {
}
