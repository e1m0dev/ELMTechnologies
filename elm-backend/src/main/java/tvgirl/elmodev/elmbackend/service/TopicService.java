package tvgirl.elmodev.elmbackend.service;

import org.springframework.stereotype.Service;
import tvgirl.elmodev.elmbackend.entity.TopicEntity;
import tvgirl.elmodev.elmbackend.fetch.TopicRequest;
import tvgirl.elmodev.elmbackend.fetch.TopicResponse;
import tvgirl.elmodev.elmbackend.repository.TopicRepository;
import tvgirl.elmodev.elmbackend.utils.HtmlSanitizer;

import java.util.List;

@Service
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<TopicResponse> getTopics() {
        return topicRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public TopicResponse create(TopicRequest request) {

        String sanitazedContent = HtmlSanitizer.sanitize(request.content());

        TopicEntity entity = new TopicEntity(
                request.question(),
                request.answer(),
                request.author(),
                sanitazedContent,
                request.category()
        );

        TopicEntity savedEntity = topicRepository.save(entity);

        return toResponse(savedEntity);
    }

    private TopicResponse toResponse(TopicEntity entity) {
        return new TopicResponse(
                entity.getId(),
                entity.getQuestion(),
                entity.getAnswer(),
                entity.getAuthor(),
                entity.getContent(),
                entity.getCategory(),
                entity.getDate()
        );
    }
}
