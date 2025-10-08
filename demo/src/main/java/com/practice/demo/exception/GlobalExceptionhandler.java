package com.practice.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.practice.demo.payload.ApiResponse;
import com.practice.demo.payload.HandlevariousErrors;

@RestControllerAdvice
public class GlobalExceptionhandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse> handleIlligalArgumentException(IllegalArgumentException ex){
        ApiResponse response = new ApiResponse(false,ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    

    @ExceptionHandler(HandlevariousErrors.class)
    public ResponseEntity<ApiResponse> HandlevariousErrors(HandlevariousErrors ex) {
        ApiResponse response = new ApiResponse(false, "(various) Something went wrong: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(Exception ex) {
        ApiResponse response = new ApiResponse(false, "(HE) Something went wrong: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
