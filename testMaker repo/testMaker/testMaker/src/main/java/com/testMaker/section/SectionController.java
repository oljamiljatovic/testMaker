package com.testMaker.section;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.testMaker.question.Question;
import com.testMaker.question.QuestionService;
import com.testMaker.subject.Subject;
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

	@RequestMapping(value = "/sectionList", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
	public List<Section> sectionList() {

		return sectionService.findAll();
	}

	@RequestMapping(value = "/sectionListForSubject/{id}", method = RequestMethod.PUT, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
	public List<Section> sectionListForSubject(@PathVariable long id) {
		ArrayList<Subject> subjects = (ArrayList<Subject>) subjectService.findAll();
		for (Subject subject : subjects) {
			if (subject.getId().equals(id)) {
				return subject.getSectionList();
			}
		}
		return new ArrayList<Section>();
	}

	@RequestMapping(value = "/addSection", method = RequestMethod.POST, consumes = {
			MediaType.APPLICATION_JSON_VALUE } /* , produces = {MediaType.APPLICATION_JSON_VALUE} */)
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
	public void addSection(@RequestBody Section section) {
		sectionService.save(section);
	}

	@RequestMapping(value = "/questionList/{id}", method = RequestMethod.PUT, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
	public List<Question> findQuestionForSection(@PathVariable long id) {
		return sectionService.findQuestionForSection(id);
	}

	@RequestMapping(value = "/deleteSection/{id}", method = RequestMethod.DELETE)
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public void deleteSection(@PathVariable long id) {
		Section section =  sectionService.findById(id).get();
		ServletRequestAttributes attr = (ServletRequestAttributes) 
			    RequestContextHolder.currentRequestAttributes();
		
		
		HttpSession session= attr.getRequest().getSession();
		Long subject = (Long) session.getAttribute("subjectID");
		List<Section> sectionList = subjectService.findSectionsForSubject(subject);
		for (Section section2 : sectionList) {
			if(section2.getId().equals(id)) {
				sectionList.remove(section2);
			}
		}
		//subjectService.save(subject);
		//sectionService.delete(section);
	}
	
	@RequestMapping(value = "/scheduleQuestionsInSections/{id}", method = RequestMethod.POST, produces = {
			MediaType.APPLICATION_JSON_VALUE }, consumes = { MediaType.APPLICATION_JSON_VALUE })
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
