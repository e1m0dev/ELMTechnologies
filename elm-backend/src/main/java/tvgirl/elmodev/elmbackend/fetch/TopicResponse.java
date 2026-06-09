package tvgirl.elmodev.elmbackend.fetch;

import java.time.Instant;
import java.util.UUID;

public record TopicResponse(
        UUID id,
        String question,
        String answer,
        String author,
        String content,
        String category,
        Instant data
) {
}
