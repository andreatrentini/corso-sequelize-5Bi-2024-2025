CREATE DATABASE compagniaaerea;

USE compagniaaerea;

-- definizione tabelle
CREATE TABLE Voli(
	id int primary key auto_increment,
	orariopartenza timestamp,
	durataminuti smallint,
	fkaeroportopartenza smallint,
	fkaeroportoarrivo smallint
);

CREATE TABLE Giornalieri(
	fkvolo int
);

CREATE TABLE Settimanali(
	fkvolo int,
	giornosettimana tinyint
);

CREATE TABLE Mensili(
	fkvolo int,
	giornomese tinyint
);

CREATE TABLE Aeroporti(
	codice smallint primary key,
	nome varchar(20),
	fkcategoria tinyint,
	fkcitta smallint
);

CREATE TABLE Tappeintermedie(
	fkvolo int,
	fkaeroporto smallint,
	ordine tinyint
);

CREATE TABLE Categorie(
	id tinyint primary key auto_increment, -- tinyint perchè non ci sono molte categorie
	nome varchar(20)
);




CREATE TABLE Citta(
	id smallint primary key auto_increment,
	nome varchar(50),
	numeroabitanti int,
	fkregione smallint
);

CREATE TABLE Regioni(
	id smallint primary key auto_increment,
	nome varchar(50)
);

CREATE TABLE Mensiliregioni(
	fkmensile int,
	fkregione smallint
);

-- ----------------------------------------
-- definizione vincoli primary key
-- ----------------------------------------

ALTER TABLE Giornalieri ADD CONSTRAINT PKGiornaliero PRIMARY KEY (fkvolo);

ALTER TABLE Settimanali ADD CONSTRAINT PKSettimanale PRIMARY KEY (fkvolo);

ALTER TABLE Mensili ADD CONSTRAINT PKMensile PRIMARY KEY (fkvolo);

ALTER TABLE Mensiliregioni ADD CONSTRAINT PKMensileregione PRIMARY KEY (fkmensile,fkregione);

ALTER TABLE Tappeintermedie ADD CONSTRAINT PKTappaintermedia PRIMARY KEY (fkvolo,fkaeroporto);

-- ---------------------------------------
-- definizione vincoli foreign key
-- ----------------------------------------

ALTER TABLE Voli ADD CONSTRAINT FKVoloAreoportopartenza FOREIGN KEY (fkaeroportopartenza) REFERENCES Aeroporti(codice);
ALTER TABLE Voli ADD CONSTRAINT FKVoloAreoportoarrivo FOREIGN KEY (fkaeroportoarrivo) REFERENCES Aeroporti(codice);

ALTER TABLE Giornalieri ADD CONSTRAINT FKGiornalieroVolo FOREIGN KEY (fkvolo) REFERENCES Voli(id);

ALTER TABLE Settimanali ADD CONSTRAINT FKSettimanaleVolo FOREIGN KEY (fkvolo) REFERENCES Voli(id);

ALTER TABLE Mensili ADD CONSTRAINT FKMensileVolo FOREIGN KEY (fkvolo) REFERENCES Voli(id);

ALTER TABLE Aeroporti ADD CONSTRAINT FKAeroportoCategoria FOREIGN KEY (fkcategoria) REFERENCES Categorie(id);
ALTER TABLE Aeroporti ADD CONSTRAINT FKAeroportoCitta FOREIGN KEY (fkcitta) REFERENCES Citta(id);

ALTER TABLE Tappeintermedie ADD CONSTRAINT FKTappaintermediaVolo FOREIGN KEY (fkvolo) REFERENCES Voli(id);
ALTER TABLE Tappeintermedie ADD CONSTRAINT FKTappaintermediaAeroporto FOREIGN KEY (fkaeroporto) REFERENCES Aeroporti(codice);

ALTER TABLE Citta ADD CONSTRAINT FKCittaRegione FOREIGN KEY (fkregione) REFERENCES Regioni(id);

ALTER TABLE Mensiliregioni ADD CONSTRAINT FKMensileregioneMensile FOREIGN KEY (fkmensile) REFERENCES Mensili(fkvolo);
ALTER TABLE Mensiliregioni ADD CONSTRAINT FKMensileregioneRegione FOREIGN KEY (fkregione) REFERENCES Regioni(id);

-- ------------------------
-- definizione vincoli 
-- ------------------------

ALTER TABLE Settimanali ADD CONSTRAINT CHECK (giornosettimana > 0 AND giornosettimana < 8);
ALTER TABLE Mensili ADD CONSTRAINT CHECK (giornomese > 0 AND giornomese < 32);