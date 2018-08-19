package com.testMaker.subject;

import lombok.Data;
@Data
public class SubjectDTO {
	private Long id;
	
	private String name;
	
	public SubjectDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}

}
