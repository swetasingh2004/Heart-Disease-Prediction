package com.cardioai.backend.service;

import com.cardioai.backend.dto.MlPredictionRequest;
import com.cardioai.backend.dto.MlPredictionResponse;
import com.cardioai.backend.entity.Prediction;
import com.cardioai.backend.repository.PredictionRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class PredictionService {

    private final PredictionRepository predictionRepository;
    private final RestTemplate restTemplate;

    private final String ML_SERVICE_URL =
            "http://127.0.0.1:8000/predict";

    public PredictionService(
            PredictionRepository predictionRepository,
            RestTemplate restTemplate
    ) {
        this.predictionRepository = predictionRepository;
        this.restTemplate = restTemplate;
    }


    // Save a prediction directly to MySQL
    public Prediction savePrediction(Prediction prediction) {
        return predictionRepository.save(prediction);
    }


    // Get all predictions
    public List<Prediction> getAllPredictions() {
        return predictionRepository.findAll();
    }


    // Get prediction by ID
    public Prediction getPredictionById(Long id) {
        return predictionRepository
                .findById(id)
                .orElse(null);
    }


    // Delete prediction
    public void deletePrediction(Long id) {
        predictionRepository.deleteById(id);
    }


    // Send patient data to FastAPI and save the result
    public Prediction predict(MlPredictionRequest request) {

        // Call FastAPI
        MlPredictionResponse response =
                restTemplate.postForObject(
                        ML_SERVICE_URL,
                        request,
                        MlPredictionResponse.class
                );

        // Create database object
        Prediction prediction = new Prediction();

        prediction.setAge(request.getAge());
        prediction.setSex(request.getSex());
        prediction.setChestPain(request.getChest_pain());
        prediction.setRestingBP(request.getResting_bp());
        prediction.setCholesterol(request.getCholesterol());
        prediction.setFastingBS(request.getFasting_bs());
        prediction.setRestingECG(request.getResting_ecg());
        prediction.setMaxHR(request.getMax_hr());
        prediction.setExerciseAngina(request.getExercise_angina());
        prediction.setOldpeak(request.getOldpeak());
        prediction.setStSlope(request.getSt_slope());

        // Store ML result
        prediction.setPrediction(response.getPrediction());
        prediction.setProbability(response.getProbability());

        // Save result in MySQL
        return predictionRepository.save(prediction);
    }
}