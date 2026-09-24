package com.cardioai.backend.dto;

public class MlPredictionRequest {

    private int age;
    private String sex;
    private String chest_pain;
    private int resting_bp;
    private int cholesterol;
    private int fasting_bs;
    private String resting_ecg;
    private int max_hr;
    private String exercise_angina;
    private double oldpeak;
    private String st_slope;

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

    public String getChest_pain() {
        return chest_pain;
    }

    public void setChest_pain(String chest_pain) {
        this.chest_pain = chest_pain;
    }

    public int getResting_bp() {
        return resting_bp;
    }

    public void setResting_bp(int resting_bp) {
        this.resting_bp = resting_bp;
    }

    public int getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(int cholesterol) {
        this.cholesterol = cholesterol;
    }

    public int getFasting_bs() {
        return fasting_bs;
    }

    public void setFasting_bs(int fasting_bs) {
        this.fasting_bs = fasting_bs;
    }

    public String getResting_ecg() {
        return resting_ecg;
    }

    public void setResting_ecg(String resting_ecg) {
        this.resting_ecg = resting_ecg;
    }

    public int getMax_hr() {
        return max_hr;
    }

    public void setMax_hr(int max_hr) {
        this.max_hr = max_hr;
    }

    public String getExercise_angina() {
        return exercise_angina;
    }

    public void setExercise_angina(String exercise_angina) {
        this.exercise_angina = exercise_angina;
    }

    public double getOldpeak() {
        return oldpeak;
    }

    public void setOldpeak(double oldpeak) {
        this.oldpeak = oldpeak;
    }

    public String getSt_slope() {
        return st_slope;
    }

    public void setSt_slope(String st_slope) {
        this.st_slope = st_slope;
    }
}