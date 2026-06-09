package tvgirl.elmodev.elmbackend.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tvgirl.elmodev.elmbackend.fetch.TopicRequest;
import tvgirl.elmodev.elmbackend.fetch.TopicResponse;
import tvgirl.elmodev.elmbackend.service.TopicService;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public List<TopicResponse> getAll() {
        return topicService.getTopics();
    }

    @PostMapping
    public ResponseEntity<TopicResponse> create(@RequestBody TopicRequest request) {
        TopicResponse response = topicService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
