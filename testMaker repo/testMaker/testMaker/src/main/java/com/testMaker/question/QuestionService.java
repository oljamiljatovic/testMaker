package com.testMaker.question;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

	List<Question> findAll();

	Question findById(Long id);

	void delete(Question question);

	Question save(Question question);

	void deleteById(Long id);

	Question change(Question question);
}
