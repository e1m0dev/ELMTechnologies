package tvgirl.elmodev.elmbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ElmBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElmBackendApplication.class, args);

        System.out.println("Developer: ELM'o");
        System.out.println("Version: 1.0");
    }


}
