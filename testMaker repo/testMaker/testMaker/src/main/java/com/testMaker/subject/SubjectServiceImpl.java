package com.testMaker.subject;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testMaker.section.Section;
import com.testMaker.test.Test;

@Service
public class SubjectServiceImpl implements SubjectService {
	@Autowired
	private SubjectRepository repository;
	@Override
	public List<Subject> findAll() {
		return (List<Subject>) repository.findAll(); 
	}

	@Override
	public Subject findById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public void delete(Subject subject) {
		repository.delete(subject);
		
	}

	@Override
	public Subject save(Subject subject) {
		return repository.save(subject);
	}

	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);
		
	}

	@Override
	public List<Section> findSectionsForSubject(Long id) {
		for (Subject subject : repository.findAll()) {
			if(subject.getId() == id) {
				return subject.getSectionList();
			}
		}
		return new ArrayList<Section>();
	}

	@Override
	public List<Test> getTestsForSubject(long id) {
		return repository.findById(id).get().getTestList();
	}

}
