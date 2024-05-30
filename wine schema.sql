USE wine;

-- Users 테이블 생성
CREATE TABLE Users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    gender VARCHAR(50),
    age INT,
    status INT NOT NULL,
    PRIMARY KEY (user_id)
);


-- Wine 테이블 생성
CREATE TABLE Wine (
    wine_id INT NOT NULL AUTO_INCREMENT,
    wine_desc TEXT,
    rating_count INT NOT NULL,
    rating_average FLOAT NOT NULL,
    type_id INT,
    PRIMARY KEY (wine_id)
);

-- Recommend_list 테이블 생성
CREATE TABLE Recommend_list (
    recommend_list_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    wine_id INT NOT NULL,
    clicked INT NOT NULL,
    PRIMARY KEY (recommend_list_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (wine_id) REFERENCES Wine(wine_id)
);

-- Characteristics 테이블
CREATE TABLE Characteristics (
    characteristics_id INT NOT NULL AUTO_INCREMENT,
    sweetness FLOAT NOT NULL,
    alcohol FLOAT NOT NULL,
    tannin FLOAT NOT NULL,
    body FLOAT NOT NULL,
    acidity FLOAT NOT NULL,
    PRIMARY KEY (characteristics_id)
);

-- Wine_Characteristics 테이블
CREATE TABLE Wine_Characteristics (
    wine_characteristics_id INT NOT NULL AUTO_INCREMENT,
    wine_id INT NOT NULL,
    characteristics_id INT NOT NULL,
    PRIMARY KEY (wine_characteristics_id),
    FOREIGN KEY (wine_id) REFERENCES Wine(wine_id),
    FOREIGN KEY (characteristics_id) REFERENCES Characteristics(characteristics_id)
);

-- Food 테이블
CREATE TABLE Food (
    food_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (food_id)
);
-- Food_List 테이블
CREATE TABLE Food_List (
    food_list_id INT NOT NULL AUTO_INCREMENT,
    wine_id INT NOT NULL,
    PRIMARY KEY (food_list_id),
    FOREIGN KEY (wine_id) REFERENCES Wine(wine_id)
);

-- Recommend 테이블
CREATE TABLE Recommend (
    recommend_id INT NOT NULL AUTO_INCREMENT,
    recommend_list_id INT NOT NULL,
    PRIMARY KEY (recommend_id),
    FOREIGN KEY (recommend_list_id) REFERENCES Recommend_list(recommend_list_id)
);

---------------------------------------------
SELECT * FROM Characteristics;