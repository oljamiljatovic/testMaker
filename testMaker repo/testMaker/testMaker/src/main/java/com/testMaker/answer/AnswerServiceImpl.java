package com.testMaker.answer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testMaker.question.Question;

@Service
public class AnswerServiceImpl implements AnswerService{

	@Autowired
	private AnswerRepository repository;

	@Override
	public List<Answer> findAll() {
		return (List<Answer>) repository.findAll();
	}

	@Override
	public Optional<Answer> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public void delete(Answer answer) {
		repository.delete(answer);
	}
	
	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);
	}
	
	@Override
	public Answer save(Answer answer) {
		return repository.save(answer);
	}

	@Override
	public Answer change(Answer answer) {
		Answer foundedAnswer = repository.findById(answer.getId()).get();
		foundedAnswer.setExactitude(answer.isExactitude());
		if(answer.isExactitude()) {
			foundedAnswer.setSign("+");
		}else {
			foundedAnswer.setSign("-");
		}
		foundedAnswer.setText(answer.getText());
		
		return foundedAnswer;
	}
}
