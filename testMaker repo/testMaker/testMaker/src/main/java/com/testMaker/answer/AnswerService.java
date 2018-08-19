package com.testMaker.answer;
import java.util.List;
import java.util.Optional;

public interface AnswerService {

	List<Answer> findAll();

	Optional<Answer> findById(Long id);

	void delete(Answer answer);

	Answer save(Answer answer);

	void deleteById(Long id);

	Answer change(Answer answer);
}
