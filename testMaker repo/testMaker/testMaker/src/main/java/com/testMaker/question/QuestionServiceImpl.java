package com.testMaker.question;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testMaker.answer.Answer;
import com.testMaker.answer.AnswerRepository;

@Service
public class QuestionServiceImpl implements QuestionService{

	@Autowired
	private QuestionRepository repository;
	
	@Autowired
	private AnswerRepository answerRepository;

	@Override
	public List<Question> findAll() {
		return (List<Question>) repository.findAll();
	}

	@Override
	public Question findById(Long id) {
		Question question = repository.findById(id).get();
		return question;
	}

	@Override
	public void delete(Question question) {
		repository.delete(question);
	}
	
	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);
	}
	
	@Override
	public Question save(Question question) {
		for (Answer answer : question.getAnswerList()) {
			answer = answerRepository.save(answer);
		}
		return repository.save(question);
	}

	@Override
	public Question change(Question question) {
		Question foundedQuestion = repository.findById(question.getId()).get();
		foundedQuestion.setName(question.getName());
		foundedQuestion.setText(question.getText());
		foundedQuestion = repository.save(foundedQuestion);
		return foundedQuestion;
		
	}

}
