package com.testMaker.question;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import com.testMaker.answer.Answer;

import lombok.Data;

@Data
@Entity
public class Question {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY
	)
	//@Column(name = "SUBJECT_ID")
	private Long id;
	
	private String name;
	private String text; 
	private String type;
	private Category category;
	private double plusPoints;
	private double minusPoints;
	
	@OneToMany
	@JoinColumn(name = "QUESTION_ID")
	private List<Answer> answerList = new ArrayList<Answer>();
	
	public Question(String name, String type, String text) {
		this.name = name;
		this.type = type;
		this.text = text;

	}

	public void addAnswer(Answer answer) {
		this.answerList.add(answer);
	}

	public Question() {
		
	}
}
