package com.testMaker.question;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.testMaker.answer.Answer;
import com.testMaker.answer.AnswerService;
import com.testMaker.section.Section;
import com.testMaker.section.SectionService;
import com.testMaker.question.Category;

@CrossOrigin(origins = "http://127.0.0.1:3000/")
@RestController
public class QuestionController {
	
	
	@Autowired
	private QuestionService questionService;

	@Autowired
	private AnswerService answerService;
	
	@Autowired
	private SectionService sectionService;

	@RequestMapping(value = "/question/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Question findQuestionById(@PathVariable long id) {
	  return questionService.findById(id);
	}
	
	@RequestMapping(value = "/categories", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE })
	@CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Category[] findQuestionById() {
		
	  return Category.values();
	}
	
	@RequestMapping(value = "/changeQuestion", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } , produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Question changeQuestion(@RequestBody Question question) {
	  return questionService.change(question);
  }
	@RequestMapping(value = "/changeAnswer/{id}", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } , produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Question changeQuestion(@RequestBody Answer answer, @PathVariable Long id) {
	  Answer changedAnswer = answerService.change(answer);
	  Question question = questionService.findById(id);
	  List<Answer> answers = question.getAnswerList();
	  for (int i = 0; i< answers.size(); i++) {//pitati Vladu da li je uopste ovo potrebno
		  if(answers.get(i).getId() == changedAnswer.getId()) {
			  answers.remove(i);
			  answers.add(changedAnswer);
		  }
		}
		  questionService.save(question);
		return question;
  }
	
	@RequestMapping(value = "/addQuestion/{id}", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE } , produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin(origins = "http://127.0.0.1:3000/")
    public Question addQuestion(@RequestBody Question question, @PathVariable Long id) {
	 
		Question addedQuestion = questionService.save(question);
		Section foundedSection = sectionService.findById(id).get();
		foundedSection.addQuestion(addedQuestion);
		foundedSection = sectionService.save(foundedSection);
		return addedQuestion;
  }
	  @RequestMapping(value = "/fileUploadPlease", method = RequestMethod.POST)
	    @CrossOrigin(origins = "http://127.0.0.1:3000/")
	    public List<Question> fileUpload(@RequestParam MultipartFile file) {
	    	ArrayList<Question> questionList = new ArrayList<Question>();
	    	InputStream inputStream = null;
	        ClassLoader classLoader = getClass().getClassLoader();
	        try {
				inputStream = file.getInputStream();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        
	        try {
				String data = readFromInputStream(inputStream);
				String[] questionsWithNames = data.split("[.][\n]");
				
				for (String questionWithName : questionsWithNames) {
					if(questionWithName.charAt(0) == '\n') {
						questionWithName = questionWithName.substring(1, questionWithName.length());
					}
					String[] questionParts  = questionWithName.split("[\n]");
					String name = questionParts[0];
					String type = questionParts[1];
					
					if(type.equals("/t") || type.equals("/c")) {
						String text = questionParts[2];
						Question question = new Question(name, type,text);
						for(int i = 3; i< questionParts.length; i++) { // za ponudjene odgovore
							String sign;
							String textAnswer;
							if(questionParts[i].contains("+")) {
								sign = "+";
								textAnswer = questionParts[i].substring(1, questionParts[i].length());
							}else {
								sign = "-";
								textAnswer = questionParts[i].substring(1, questionParts[i].length());	
							}
							Answer answer = new Answer(sign, textAnswer);
							answer = answerService.save(answer);
							question.addAnswer(answer);
							
						}
						question.setCategory(Category.EASY);
						question.setPlusPoints(1.0);
						question = questionService.save(question);
						questionList.add(question);
			
					}else {
						//ovdje ce ici za /u
						String textQuestion="";
						String answer = "";
						for(int i = 2; i< questionParts.length; i++) {
							if(!(questionParts[i].charAt(0) == ((char)92))){ //ako nije odgovor
								textQuestion += questionParts[i];
							}else {
								answer = questionParts[i];
							}
						}
						Question question = new Question(name, type,textQuestion);
						question.setCategory(Category.EASY);
						question.setPlusPoints(1.0);
						Answer answerQuestion = new Answer("", answer);
						answerService.save(answerQuestion);
						question.addAnswer(answerQuestion);
						Question addedQuestion = questionService.save(question);
						questionList.add(addedQuestion);
						//String backslash = ((char)92) + "";
					}
				}
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return questionList;
	    }
	    private String readFromInputStream(InputStream inputStream)
	    		  throws IOException {
	    		    StringBuilder resultStringBuilder = new StringBuilder();
	    		    try (BufferedReader br
	    		      = new BufferedReader(new InputStreamReader(inputStream))) {
	    		        String line;
	    		        while ((line = br.readLine()) != null) {
	    		            resultStringBuilder.append(line + "\n");
	    		        }
	    		    }
	    		  return resultStringBuilder.toString();
	    		}
	   
	    
}
