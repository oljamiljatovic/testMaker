package com.testMaker.test;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
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
import com.testMaker.subject.Subject;
import com.testMaker.subject.SubjectService;

@CrossOrigin(origins = "http://127.0.0.1:3000/")
@RestController
public class TestController {

	@Autowired
	private TestService testService;
	@Autowired
	private SubjectService subjectService;
	
	
	@RequestMapping(value = "/addTest/{id}", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } , produces = {MediaType.APPLICATION_JSON_VALUE})
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Test addTest(@RequestBody Test test, @PathVariable Long id) {
	
		Test savedTest = testService.save(test);
		Subject foundedSubject = subjectService.findById(id);
		foundedSubject.addTest(savedTest);
		subjectService.save(foundedSubject);
		return savedTest;
	}
	@RequestMapping(value = "/questionsForTest/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public List<Question> questionsForTest(@PathVariable long id) {
		return testService.findById(id).getQuestionList();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public void delete(@PathVariable long id) {
		Test test =  testService.findById(id);
		testService.delete(test);
	}
	
	@RequestMapping(value = "/exportTest/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Test exportTest(@PathVariable long id) throws IOException{
		Test test = testService.findById(id);
	/*	SKAL=1000 NEGOD=3 POZ=2000 NEG=-1000 ISPT=0 EDIT=0
				SRAND=1 SVIODG=1 TESTP=0 DETALJI=1*/
		
		PrintWriter writer = new PrintWriter("the-file-name.txt", "UTF-8");
		writer.println("/ SKAL="+test.getSKAL()+" NEGOD="+test.getNEGOD()+" POZ="+test.getPOZ()+" NEG="+test.getNEG()
		+" ISPT="+test.getISPT()+" EDIT="+test.getEDIT()+" SRAND="+test.getSRAND()+" SVIODG="+test.getSVIODG()
		+" TESTP="+test.getTESTP()+" DETALJI="+test.getDETALJI()); //first line
		writer.println("");
		String group = "";
		if(test.getGroupTag().equals("1") || test.getGroupTag().equals("a")) {
			group = "A";
		}else if(test.getGroupTag().equals("2") || test.getGroupTag().equals("b")) {
			group = "B";
		}
		writer.println(test.getLabel()+ " "+group); //third
		writer.println("\""+test.getName() + "\"");
		writer.println("="+test.getMaterials());
		writer.println("//oblast \t\t pitanje \t +poeni \t -poeni \t izbacivanje");
		for (Question question : test.getQuestionList()) {
			writer.println("SEKCIJA TJ OBLAST" + "\t\t" + question.getName() + "\t" +question.getPlusPoints()
			+"\t" +question.getMinusPoints() + "\t izbacivanje");
		}
		
		
		writer.close();
		return test;
	}
}
