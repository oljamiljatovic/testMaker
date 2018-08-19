package com.testMaker.section;

import static org.assertj.core.api.Assertions.assertThatIllegalStateException;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.testMaker.question.Question;

import lombok.Data;

@Data
@Entity
public class Section {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@ManyToMany
	@JoinTable(name = "SECTION_QUESTIONS", joinColumns = @JoinColumn(name = "SECTION_ID"), inverseJoinColumns = @JoinColumn(name = "QUESTION_ID"))
	private List<Question> questionList;
	
	public void addQuestion(Question question) {
		this.questionList.add(question);
	}
}
