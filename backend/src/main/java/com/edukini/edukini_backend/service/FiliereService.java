package com.edukini.edukini_backend.service;

import com.edukini.edukini_backend.dto.FiliereStudentCountDto;
import com.edukini.edukini_backend.dto.StudentCountsDto;
import com.edukini.edukini_backend.model.Filiere;
import com.edukini.edukini_backend.repository.FiliereRepository;
import com.edukini.edukini_backend.repository.UserRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FiliereService {

    @Autowired
    private FiliereRepository filiereRepository;

    @Autowired
    private UserRepository userRepository;

    public StudentCountsDto getStudentEnrollmentCounts() {
        long total = userRepository.countRegisteredStudents();
        List<Filiere> list = filiereRepository.findAll();
        list.sort(Comparator.comparing(Filiere::getId));
        List<FiliereStudentCountDto> rows = new ArrayList<>();
        for (Filiere f : list) {
            rows.add(new FiliereStudentCountDto(
                    f.getId(),
                    userRepository.countRegisteredStudentsForFiliere(f.getId())));
        }
        return new StudentCountsDto(total, rows);
    }

    public List<Filiere> findAll() {
        return filiereRepository.findAll();
    }

    public Optional<Filiere> findById(Long id) {
        return filiereRepository.findById(id);
    }

    public Filiere save(Filiere filiere) {
        return filiereRepository.save(filiere);
    }

    public void deleteById(Long id) {
        filiereRepository.deleteById(id);
    }
}
