package com.testMaker.section;

import java.util.List;
import java.util.Optional;

import com.testMaker.question.Question;
import com.testMaker.subject.Subject;

public interface SectionService {

	List<Section> findAll();

	Optional<Section> findById(Long id);

	void delete(Section section);

	Section save(Section section);

	void deleteById(Long id);

	List<Question> findQuestionForSection(long id);
}
