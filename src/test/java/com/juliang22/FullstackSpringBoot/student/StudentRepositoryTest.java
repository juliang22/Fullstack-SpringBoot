package com.juliang22.FullstackSpringBoot.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class StudentRepositoryTest {
    @Autowired
    private StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfStudentExistsEmail() {
        // Given
        Student student = new Student(
                "name",
                "email@email.com",
                Gender.MALE
        );
        underTest.save(student);
        // When
        boolean exists = underTest.selectExistsEmail("email@email.com");
        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void itShouldCheckIfStudentEmailDoesNotExist() {
        // Given
        String email = "email@email.com";
        // When
        boolean exists = underTest.selectExistsEmail(email);
        // Then
        assertThat(exists).isFalse();
    }
}