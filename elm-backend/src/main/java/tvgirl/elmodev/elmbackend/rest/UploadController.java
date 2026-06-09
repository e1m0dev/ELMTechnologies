package tvgirl.elmodev.elmbackend.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin("*")
public class UploadController {

    private static final String UPLOAD_DIR = "uploads";

    @PostMapping
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file
    ) {

        try {

            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Файл пустой");
            }

            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String extension = StringUtils.getFilenameExtension(
                    file.getOriginalFilename()
            );

            String fileName =
                    UUID.randomUUID() + "." + extension;

            Path path = Paths.get(
                    UPLOAD_DIR,
                    fileName
            );

            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            String imageUrl =
                    "http://localhost:8080/uploads/" + fileName;

            return ResponseEntity.ok(
                    Map.of(
                            "url",
                            imageUrl
                    )
            );

        } catch (IOException e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка загрузки");

        }
    }
}
