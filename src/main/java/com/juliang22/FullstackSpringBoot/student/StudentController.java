package com.juliang22.FullstackSpringBoot.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController // exposes endpoints for the client to consume
@RequestMapping(path = "api/v1/students") // changes the url
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public Long deleteStudent(@PathVariable("studentId") String studentId) {
        Long id = Long.valueOf(studentId);
        studentService.deleteStudent(id);
        return id;
    }

}
