package com.testMaker.test;

import java.util.List;

import com.testMaker.section.Section;
import com.testMaker.subject.Subject;

public interface TestService {
	List<Test> findAll();

	Test findById(Long id);

	void delete(Test test);

	Test save(Test test);

	void deleteById(Long id);

	
}
