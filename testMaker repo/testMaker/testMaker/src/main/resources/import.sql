
--subject
INSERT INTO SUBJECT(NAME) VALUES ('Programski prevodioci')
INSERT INTO SUBJECT(NAME) VALUES ('Operativni sistemi')
--section

INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('sintaksa', 1)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('generisanje koda',1)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('STL',2)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('niti',2)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('mutex',2)


--question
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pitanje broj 1.1', 'Koraci kompajlera ', '/c', 0, 1,1);
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pitanje broj 1.2', 'Koje faze su posle parsera ', '/c',0,1,1);
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pitanje broj 2.1', 'Generisanje koda je  ', '/c',0, 1,1);
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pitanje broj 2.1', 'Funkcije koje se koriste u STL', '/c', 0, 1, 1);

--answer
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT, QUESTION_ID) VALUES('+', true, 'leksicka analiza', 1);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'optimizacija',1);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, 'parsiranje 1', 2);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'parsiranje 2',2);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, 'push_back', 4);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'vector',4);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, 'metoda kojom se prevodi u asemblerski kod', 3);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'iz asemblerskog u ...',3);


--section povezan sa question
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (1,1) --sintaksa 
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (1,2)
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (2,3)
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (3,4)



