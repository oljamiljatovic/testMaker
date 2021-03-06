
--subject
INSERT INTO SUBJECT(NAME) VALUES ('Programski prevodioci')
INSERT INTO SUBJECT(NAME) VALUES ('Operativni sistemi')
INSERT INTO SUBJECT(NAME) VALUES ('Programski jezici')
--section

INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('sintaksa', 1)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('generisanje koda',1)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('STL',2)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('niti',2)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('mutex',2)
INSERT INTO SECTION(NAME,SUBJECT_ID) VALUES('regularni izrazi',1)


--question
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pt1.1', 'Koraci kompajlera ', '/c', 0, 1,1);
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pt1.2', 'Koje faze su posle parsera ', '/c',1,2,1);
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pitanje broj 2.1', 'Generisanje koda je  ', '/c',2, 3,1);
INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('*Pitanje broj 2.1', 'Funkcije koje se koriste u STL', '/c', 0, 1, 1);

INSERT INTO QUESTION(NAME,TEXT,TYPE, CATEGORY, PLUS_POINTS, MINUS_POINTS) VALUES('IDn*2', 'Listanje sadržaja...', '/t', 1, 2, 1);
--torijuma u <i>bash shell</i>-u se ostvaruje komandom:--

--answer
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT, QUESTION_ID) VALUES('+', true, 'leksicka analiza', 1);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'optimizacija',1);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, 'parsiranje 1', 2);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'parsiranje 2',2);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, 'push_back', 4);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'vector',4);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, 'metoda kojom se prevodi u asemblerski kod', 3);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, 'iz asemblerskog u ...',3);

INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('+', true, '<c>ls</c>',5);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, '<c>cat</c>',5);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, '<c>pwd</c>',5);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, '<c>cd</c>',5);
INSERT INTO ANSWER(SIGN, EXACTITUDE, TEXT,QUESTION_ID) VALUES('-', false, '<c>less</c>',5);



--section povezan sa question
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (1,1) --sintaksa 
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (1,2)
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (2,3)
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (3,4)
INSERT INTO SECTION_QUESTIONS(SECTION_ID, QUESTION_ID) VALUES (1,5)


INSERT INTO TEST(NAME, LABEL, GROUP_TAG, MATERIALS, SKAL, NEGOD, POZ, NEG, ISPT, EDIT,SRAND,SVIODG, TESTP,DETALJI, SUBJECT_ID) VALUES ('Test 1', 'FA', 'FAS', 'FAS',  1,1,1,1,1,1,1,1,1,1,1)
INSERT INTO TEST(NAME, LABEL, GROUP_TAG, MATERIALS, SKAL, NEGOD, POZ, NEG, ISPT, EDIT,SRAND,SVIODG, TESTP,DETALJI, SUBJECT_ID) VALUES ('Test 2', 'FA', 'FAS', 'FAS',  1,1,1,1,1,1,1,1,1,1,1)
INSERT INTO TEST(NAME, LABEL, GROUP_TAG, MATERIALS, SKAL, NEGOD, POZ, NEG, ISPT, EDIT,SRAND,SVIODG, TESTP,DETALJI, SUBJECT_ID) VALUES ('Test 3', 'FA', 'FAS', 'FAS',  1,1,1,1,1,1,1,1,1,1,1)
INSERT INTO TEST(NAME, LABEL, GROUP_TAG, MATERIALS, SKAL, NEGOD, POZ, NEG, ISPT, EDIT,SRAND,SVIODG, TESTP,DETALJI, SUBJECT_ID) VALUES ('Test 4 - programski prevodioci', 'FA', 'FAS', 'FAS',  1,1,1,1,1,1,1,1,1,1,1)

INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(1,1)
INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(1,2)
INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(1,3)

INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(2,1)
INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(2,2)

INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(3,2)
INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(3,3)

INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(4,2)
INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(4,3)
INSERT INTO TEST_QUESTIONS(TEST_ID,QUESTION_ID) VALUES(4,1)