package com.testMaker.section;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.testMaker.question.Question;
import com.testMaker.question.QuestionService;
import com.testMaker.subject.SubjectService;

@CrossOrigin(origins = "http://127.0.0.1:3000/")
@RestController
public class SectionController {

	@Autowired
	private SubjectService subjectService;
	
	@Autowired
	private SectionService sectionService;
	

	@Autowired
	private QuestionService questionService;
	
	 @RequestMapping(value = "/sectionList", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
	    @CrossOrigin(origins = "http://127.0.0.1:3000/")
	    public List<Section> sectionList() {
	 
		 return sectionService.findAll();
	 	}

	  @RequestMapping(value = "/addSection", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } /*, produces = {MediaType.APPLICATION_JSON_VALUE}*/)
	    @CrossOrigin(origins = "http://127.0.0.1:3000/")
	    public void addSection(@RequestBody Section section) {
		  sectionService.save(section);
	  }
	  
	  @RequestMapping(value = "/questionList/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
		@CrossOrigin(origins = "http://127.0.0.1:3000/")
	    public List<Question> findQuestionForSection(@PathVariable long id) {
		  return sectionService.findQuestionForSection(id);
		}
	  
	  
	  @RequestMapping(value = "/scheduleQuestionsInSections/{id}", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE }, consumes = {MediaType.APPLICATION_JSON_VALUE })
		@CrossOrigin(origins = "http://127.0.0.1:3000/")
	    public Section scheduleQuestionsInSections(@PathVariable long id, @RequestBody List<Question> questions) {
		 Section section = sectionService.findById(id).get();
		for (Question question : questions) {
			Question foundedQuestion = questionService.findById(question.getId());
			section.addQuestion(foundedQuestion);
		}
		
		section = sectionService.save(section);
		
		return section;
		}
}
