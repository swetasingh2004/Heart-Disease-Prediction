package com.cardioai.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int age;
    private String sex;
    private String chestPain;
    private int restingBP;
    private int cholesterol;
    private int fastingBS;
    private String restingECG;
    private int maxHR;
    private String exerciseAngina;
    private double oldpeak;
    private String stSlope;

    private int prediction;
    private double probability;

    private LocalDateTime createdAt;


    // Automatically set creation time
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getChestPain() {
        return chestPain;
    }

    public void setChestPain(String chestPain) {
        this.chestPain = chestPain;
    }

    public int getRestingBP() {
        return restingBP;
    }

    public void setRestingBP(int restingBP) {
        this.restingBP = restingBP;
    }

    public int getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(int cholesterol) {
        this.cholesterol = cholesterol;
    }

    public int getFastingBS() {
        return fastingBS;
    }

    public void setFastingBS(int fastingBS) {
        this.fastingBS = fastingBS;
    }

    public String getRestingECG() {
        return restingECG;
    }

    public void setRestingECG(String restingECG) {
        this.restingECG = restingECG;
    }

    public int getMaxHR() {
        return maxHR;
    }

    public void setMaxHR(int maxHR) {
        this.maxHR = maxHR;
    }

    public String getExerciseAngina() {
        return exerciseAngina;
    }

    public void setExerciseAngina(String exerciseAngina) {
        this.exerciseAngina = exerciseAngina;
    }

    public double getOldpeak() {
        return oldpeak;
    }

    public void setOldpeak(double oldpeak) {
        this.oldpeak = oldpeak;
    }

    public String getStSlope() {
        return stSlope;
    }

    public void setStSlope(String stSlope) {
        this.stSlope = stSlope;
    }

    public int getPrediction() {
        return prediction;
    }

    public void setPrediction(int prediction) {
        this.prediction = prediction;
    }

    public double getProbability() {
        return probability;
    }

    public void setProbability(double probability) {
        this.probability = probability;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}