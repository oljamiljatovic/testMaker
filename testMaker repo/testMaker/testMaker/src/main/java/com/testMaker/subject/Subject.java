package com.testMaker.subject;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.testMaker.section.Section;
import com.testMaker.test.Test;

import lombok.Data;

@Data
@Entity
public class Subject {

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
//		/@Column(name = "SUBJECT_ID")
		private Long id;
		
		private String name;
		
		@OneToMany
		@JoinColumn(name = "SUBJECT_ID")
		//@JoinTable(name = "SUBJECT_SECTIONS", joinColumns = @JoinColumn(name = "SUBJECT_ID"), inverseJoinColumns = @JoinColumn(name = "SECTION_ID"))
		private List<Section> sectionList;
		
		@OneToMany
		@JoinColumn(name = "SUBJECT_ID")
		//@JoinTable(name = "SUBJECT_SECTIONS", joinColumns = @JoinColumn(name = "SUBJECT_ID"), inverseJoinColumns = @JoinColumn(name = "SECTION_ID"))
		private List<Test> testList;
		
		public void  addSection(Section section) {
			sectionList.add(section);
		}
		public void  addTest(Test test) {
			testList.add(test);
		}
}
