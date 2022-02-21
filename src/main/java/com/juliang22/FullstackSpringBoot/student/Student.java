package com.juliang22.FullstackSpringBoot.student;

import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
//@Data replaces all of the above annotations, but makes all of the variables "final" => later on we will connect to
// a real database with JPA, these fields cannot be final
public class Student {
    private Long Id;
    private String name;
    private String email;
    private Gender gender;
}
