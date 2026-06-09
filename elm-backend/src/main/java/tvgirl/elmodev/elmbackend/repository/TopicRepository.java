package tvgirl.elmodev.elmbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tvgirl.elmodev.elmbackend.entity.TopicEntity;

import java.util.UUID;

public interface TopicRepository extends JpaRepository<TopicEntity, UUID> {
    // Default.
}
