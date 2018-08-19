package com.testMaker.test;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testMaker.subject.Subject;
import com.testMaker.subject.SubjectRepository;

@Service
public class TestServiceImpl implements TestService{
	@Autowired
	private TestRepository repository;
	
	public List<Test> findAll() {
		return (List<Test>) repository.findAll(); 
	}

	@Override
	public Test findById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public void delete(Test test) {
		repository.delete(test);
		
	}

	@Override
	public Test save(Test test) {
		return repository.save(test);
	}

	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);
		
	}
}
