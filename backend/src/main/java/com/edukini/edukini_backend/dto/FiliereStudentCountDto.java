package com.edukini.edukini_backend.dto;

public class FiliereStudentCountDto {

    private Long filiereId;
    private long count;

    public FiliereStudentCountDto() {
    }

    public FiliereStudentCountDto(Long filiereId, long count) {
        this.filiereId = filiereId;
        this.count = count;
    }

    public Long getFiliereId() {
        return filiereId;
    }

    public void setFiliereId(Long filiereId) {
        this.filiereId = filiereId;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
