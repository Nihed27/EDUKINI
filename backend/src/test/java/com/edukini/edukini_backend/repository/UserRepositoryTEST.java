package com.edukini.edukini_backend.repository;

import com.edukini.edukini_backend.model.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@org.springframework.test.context.TestPropertySource(properties = {
    "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect"
})
public class UserRepositoryTEST {

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        User u = new User();
        u.setEmail("test@student.com");
        u.setRole("ROLE_STUDENT");
        u.setFiliereId(1L);
        userRepository.save(u);
    }

    @Test
    public void testCountRegisteredStudents() {
        long count = userRepository.countRegisteredStudents();
        Assert.assertTrue(count >= 1);
    }

    @Test
    public void testCountRegisteredStudentsForFiliere() {
        long count = userRepository.countRegisteredStudentsForFiliere(1L);
        Assert.assertTrue(count >= 1);
    }
}
