package com.edukini.edukini_backend.controller;

import com.edukini.edukini_backend.model.Recommandation;
import com.edukini.edukini_backend.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistiques")
@CrossOrigin(origins = "*")
public class StatistiquesController {

    @Autowired
    private RecommandationRepository recommandationRepository;

    /**
     * GET /api/statistiques/orientation
     * Retourne toutes les statistiques d'orientation IA pour le dashboard admin
     */
    @GetMapping("/orientation")
    public Map<String, Object> getOrientationStats() {
        List<Recommandation> allRecos = recommandationRepository.findAll();
        Map<String, Object> result = new HashMap<>();

        // Total étudiants distincts et total recommandations
        long totalEtudiants = allRecos.stream()
                .map(Recommandation::getEtudiantId)
                .distinct()
                .count();
        result.put("totalEtudiants", totalEtudiants);
        result.put("totalRecommandations", allRecos.size());

        // ── Spécialités les plus recommandées ──
        Map<String, List<Recommandation>> parSpecialite = allRecos.stream()
                .collect(Collectors.groupingBy(Recommandation::getSpecialite));

        List<Map<String, Object>> specialitesRecommandees = new ArrayList<>();
        for (Map.Entry<String, List<Recommandation>> entry : parSpecialite.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("label", entry.getKey());
            // Compter celles avec label "Recommandé"
            long countRecommande = entry.getValue().stream()
                    .filter(r -> "Recommandé".equals(r.getLabel()))
                    .count();
            item.put("count", countRecommande);
            // Pourcentage parmi tous les étudiants
            item.put("pct", totalEtudiants > 0 ? (int) (countRecommande * 100 / totalEtudiants) : 0);
            specialitesRecommandees.add(item);
        }
        specialitesRecommandees.sort((a, b) -> Long.compare((long) b.get("count"), (long) a.get("count")));
        result.put("specialitesRecommandees", specialitesRecommandees);

        // ── Taux de réussite par filière (score moyen IA) ──
        List<Map<String, Object>> tauxReussite = new ArrayList<>();
        for (Map.Entry<String, List<Recommandation>> entry : parSpecialite.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("filiere", entry.getKey());
            double avgScore = entry.getValue().stream()
                    .mapToInt(Recommandation::getScore)
                    .average()
                    .orElse(0);
            item.put("scoreIA", (int) avgScore);
            // Taux = % d'étudiants avec label "Recommandé" ou "Compatible"
            long total = entry.getValue().size();
            long reussis = entry.getValue().stream()
                    .filter(r -> "Recommandé".equals(r.getLabel()) || "Compatible".equals(r.getLabel()))
                    .count();
            item.put("taux", total > 0 ? (int) (reussis * 100 / total) : 0);
            tauxReussite.add(item);
        }
        tauxReussite.sort((a, b) -> Integer.compare((int) b.get("taux"), (int) a.get("taux")));
        result.put("tauxReussiteParFiliere", tauxReussite);

        // ── Filières les plus recommandées (= spécialités avec score > 50) ──
        List<Map<String, Object>> filieresRecommandees = new ArrayList<>();
        for (Map.Entry<String, List<Recommandation>> entry : parSpecialite.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("label", entry.getKey());
            long count = entry.getValue().stream()
                    .filter(r -> r.getScore() >= 50)
                    .count();
            item.put("count", count);
            item.put("pct", totalEtudiants > 0 ? (int) (count * 100 / totalEtudiants) : 0);
            filieresRecommandees.add(item);
        }
        filieresRecommandees.sort((a, b) -> Long.compare((long) b.get("count"), (long) a.get("count")));
        result.put("filieresRecommandees", filieresRecommandees);

        // ── Masters les plus recommandés (données simulées basées sur les spécialités) ──
        List<Map<String, Object>> mastersRecommandes = new ArrayList<>();
        mastersRecommandes.add(createMasterEntry("MRSC — Réseaux, Systèmes & Cybersécurité", parSpecialite, "Réseaux et Systèmes de Communication (RSC)"));
        mastersRecommandes.add(createMasterEntry("MASE — Automatique & Systèmes Embarqués", parSpecialite, "Électronique et Systèmes Embarqués (ESE)"));
        mastersRecommandes.add(createMasterEntry("MPSDM — Professional Software Dev & Management", parSpecialite, "Génie Logiciel (GL)"));
        mastersRecommandes.sort((a, b) -> Long.compare((long) b.get("count"), (long) a.get("count")));
        result.put("mastersRecommandes", mastersRecommandes);

        // ── Doctorats les plus recommandés (données simulées) ──
        List<Map<String, Object>> doctoratsRecommandes = new ArrayList<>();
        long topStudents = allRecos.stream()
                .filter(r -> r.getScore() >= 75)
                .map(Recommandation::getEtudiantId)
                .distinct()
                .count();
        Map<String, Object> docStic = new HashMap<>();
        docStic.put("label", "Doctorat STIC — Sciences et Technologies");
        docStic.put("count", topStudents);
        docStic.put("pct", totalEtudiants > 0 ? (int) (topStudents * 100 / totalEtudiants) : 0);
        doctoratsRecommandes.add(docStic);
        result.put("doctoratsRecommandes", doctoratsRecommandes);

        return result;
    }

    private Map<String, Object> createMasterEntry(String masterName, Map<String, List<Recommandation>> parSpec, String specKey) {
        Map<String, Object> item = new HashMap<>();
        item.put("label", masterName);
        List<Recommandation> specRecos = parSpec.getOrDefault(specKey, Collections.emptyList());
        long count = specRecos.stream()
                .filter(r -> r.getScore() >= 60)
                .count();
        long total = parSpec.values().stream().flatMap(Collection::stream)
                .map(Recommandation::getEtudiantId).distinct().count();
        item.put("count", count);
        item.put("pct", total > 0 ? (int) (count * 100 / total) : 0);
        return item;
    }
}
