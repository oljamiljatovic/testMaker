package com.testMaker.subject;

import java.util.List;

import com.testMaker.section.Section;
import com.testMaker.test.Test;

public interface SubjectService {
	List<Subject> findAll();

	Subject findById(Long id);

	void delete(Subject subject);

	Subject save(Subject subject);

	void deleteById(Long id);

	List<Section> findSectionsForSubject(Long id);

	List<Test> getTestsForSubject(long id);
}
