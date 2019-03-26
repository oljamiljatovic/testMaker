package com.testMaker.subject;

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

import com.testMaker.section.Section;
import com.testMaker.section.SectionService;
import com.testMaker.test.Test;

@CrossOrigin(origins = "http://127.0.0.1:3000/")
@RestController
public class SubjectController {

	@Autowired
	private SubjectService subjectService;
	
	@Autowired
	private SectionService sectionService;
	
	
	@RequestMapping(value = "/addSubject", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } , produces = {MediaType.APPLICATION_JSON_VALUE})
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Subject addSubject(@RequestBody Subject subject) {
		Subject retSubject = subjectService.save(subject);
		return retSubject;
	}
	
	@RequestMapping(value = "/subjectList", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE } /*, produces = {MediaType.APPLICATION_JSON_VALUE}*/)
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public List<Subject> subjectList() {
		return subjectService.findAll();
	}
	
	@RequestMapping(value = "/subjectList/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public List<Section> findSectionForSubject(@PathVariable long id) {
		return subjectService.findSectionsForSubject(id);
	}
	
	
	@RequestMapping(value = "/choosenSubject/{id}", method = RequestMethod.PUT)
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public void choosenSubject(@PathVariable long id) {
		Subject subject = subjectService.findById(id);
		ServletRequestAttributes attr = (ServletRequestAttributes) 
			    RequestContextHolder.currentRequestAttributes();
			HttpSession session= attr.getRequest().getSession(); 
			session.setAttribute("subjectID", subject.getId());
			
			System.out.println("fasf");
	}
	
	@RequestMapping(value = "/addSectionForSubject/{id}", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE }, consumes = {MediaType.APPLICATION_JSON_VALUE})
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Section addSectionForSubject(@PathVariable long id, @RequestBody Section section) {
		Section newSection = sectionService.save(section);
		Subject foundedSubject = subjectService.findById(id);
		
		foundedSubject.addSection(newSection);
		foundedSubject = subjectService.save(foundedSubject);
		return newSection;
	}
	
	@RequestMapping(value = "/getTestsForSubject/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public List<Test> getTestsForSubject(@PathVariable long id) {
		return subjectService.getTestsForSubject(id);
	}
	  
	  
}