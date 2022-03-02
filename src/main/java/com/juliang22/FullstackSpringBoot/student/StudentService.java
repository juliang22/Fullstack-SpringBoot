package com.juliang22.FullstackSpringBoot.student;

import com.juliang22.FullstackSpringBoot.student.exception.BadRequestException;
import com.juliang22.FullstackSpringBoot.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        Boolean emailExists = studentRepository.selectExistsEmail(student.getEmail());
        if (emailExists) {
            throw new BadRequestException("Email " + student.getEmail() + " is taken");
        }
        return studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException("student with id " + studentId + " does not exist");
        }
        studentRepository.deleteById(studentId);
    }
}
