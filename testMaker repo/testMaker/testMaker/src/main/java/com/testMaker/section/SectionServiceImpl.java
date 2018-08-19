package com.testMaker.section;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testMaker.question.Question;

@Service
public class SectionServiceImpl implements SectionService{

	@Autowired
	private SectionRepository repository;
	
	@Override
	public List<Section> findAll() {
		return (List<Section>) repository.findAll(); 
	}

	@Override
	public Optional<Section> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public void delete(Section section) {
		repository.delete(section);
		
	}

	@Override
	public Section save(Section section) {
		return repository.save(section);
	}

	@Override
	public void deleteById(Long id) {
		repository.deleteById(id);
		
	}

	@Override
	public List<Question> findQuestionForSection(long id) {
		for (Section section : repository.findAll()) {
			if(section.getId() == id) {
				return section.getQuestionList();
			}
		}
		return new ArrayList<Question>();
		
	}
}
