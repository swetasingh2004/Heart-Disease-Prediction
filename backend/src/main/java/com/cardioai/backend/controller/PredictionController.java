package com.cardioai.backend.controller;

import com.cardioai.backend.dto.MlPredictionRequest;
import com.cardioai.backend.entity.Prediction;
import com.cardioai.backend.service.PredictionService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }


    // Save a prediction directly to MySQL
    @PostMapping
    public Prediction savePrediction(
            @RequestBody Prediction prediction
    ) {
        return predictionService.savePrediction(prediction);
    }


    // Send patient data to FastAPI,
    // get ML prediction,
    // and save the result to MySQL
    @PostMapping("/predict")
    public Prediction predict(
            @RequestBody MlPredictionRequest request
    ) {
        return predictionService.predict(request);
    }


    // Get all predictions
    @GetMapping
    public List<Prediction> getAllPredictions() {
        return predictionService.getAllPredictions();
    }


    // Get prediction by ID
    @GetMapping("/{id}")
    public Prediction getPredictionById(
            @PathVariable Long id
    ) {
        return predictionService.getPredictionById(id);
    }


    // Delete prediction
    @DeleteMapping("/{id}")
    public String deletePrediction(
            @PathVariable Long id
    ) {
        predictionService.deletePrediction(id);

        return "Prediction deleted successfully";
    }
}