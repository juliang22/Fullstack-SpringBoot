package com.juliang22.FullstackSpringBoot.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController // exposes endpoints for the client to consume
@RequestMapping(path = "api/v1/students") // changes the url
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> students = Arrays.asList(
                new Student(
                        1L,
                        "julian",
                        "julian@fake.com",
                        Gender.MALE),
                new Student(
                        2L,
                        "John Doe",
                        "jd@fake.com",
                        Gender.MALE));

    return students;
    };
}
