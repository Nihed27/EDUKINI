package com.edukini.edukini_backend.dto;

import java.util.ArrayList;
import java.util.List;

public class StudentCountsDto {

    private long totalEtudiants;
    private List<FiliereStudentCountDto> byFiliere = new ArrayList<>();

    public StudentCountsDto() {
    }

    public StudentCountsDto(long totalEtudiants, List<FiliereStudentCountDto> byFiliere) {
        this.totalEtudiants = totalEtudiants;
        this.byFiliere = byFiliere != null ? byFiliere : new ArrayList<>();
    }

    public long getTotalEtudiants() {
        return totalEtudiants;
    }

    public void setTotalEtudiants(long totalEtudiants) {
        this.totalEtudiants = totalEtudiants;
    }

    public List<FiliereStudentCountDto> getByFiliere() {
        return byFiliere;
    }

    public void setByFiliere(List<FiliereStudentCountDto> byFiliere) {
        this.byFiliere = byFiliere != null ? byFiliere : new ArrayList<>();
    }
}
