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

