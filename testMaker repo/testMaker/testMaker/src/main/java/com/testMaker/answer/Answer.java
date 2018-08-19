package com.testMaker.answer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Answer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String sign;
	private boolean exactitude;
	private String text; 
	
	public Answer(String sign, String text) {
		this.sign = sign;
		this.text = text;
		this.exactitude = false;
		
		if(sign.equals("+")) {
			this.exactitude = true;
		}
		
	}
	
	public Answer() {
		
	}
}
