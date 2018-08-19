package com.testMaker.test;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.testMaker.question.Question;
import com.testMaker.section.Section;
import com.testMaker.subject.Subject;

import lombok.Data;

@Data
@Entity
public class Test {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String label;
	
	private String groupTag;
	
	private String materials;
	@ManyToMany
	@JoinTable(name = "TEST_QUESTIONS", joinColumns = @JoinColumn(name = "TEST_ID"), inverseJoinColumns = @JoinColumn(name = "QUESTION_ID"))
	private List<Question> questionList;
	
	private int SKAL;
	private int NEGOD;
	private int POZ;
	private int NEG;
	private int ISPT;
	private int EDIT;
	private int SRAND;
	private int SVIODG;
	private int TESTP;
	private int DETALJI;
	

	
	
}
