DROP DATABASE IF EXISTS loco_mta;

CREATE DATABASE loco_mta;

USE loco_mta;

CREATE TABLE stop_times (
  id int NOT NULL AUTO_INCREMENT,
  route_id varchar(10) NOT NULL,
  route_type varchar(10) NOT NULL,
  arrival_time varchar(20) NOT NULL,
  stop_id varchar(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE stops (
  id int NOT NULL AUTO_INCREMENT,
  stop_id varchar(10) NOT NULL,
  stop_name varchar(50) NOT NULL,
  stop_lat varchar(20) NOT NULL,
  stop_lon varchar(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE routes (
  id int NOT NULL AUTO_INCREMENT,
  route_id varchar(10) NOT NULL,
  route_desc varchar(2000) NOT NULL,
  PRIMARY KEY (id)
);