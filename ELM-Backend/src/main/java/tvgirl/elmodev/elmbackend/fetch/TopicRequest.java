package tvgirl.elmodev.elmbackend.fetch;

import java.time.Instant;

public record RequestTopic(
        String question,
        String answer,
        String author,
        String content,
        String category,
        Instant data
) {
}
