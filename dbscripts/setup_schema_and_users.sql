CREATE DATABASE turingapp;
--CONNECT turingapp;
CREATE SCHEMA turingschema;

-- Read-only role
CREATE ROLE readonly;
GRANT CONNECT ON DATABASE turingapp TO readonly;
GRANT USAGE ON SCHEMA turingschema TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA turingschema TO readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA turingschema GRANT SELECT ON TABLES TO readonly;

-- Read/write role
CREATE ROLE readwrite;
GRANT CONNECT ON DATABASE turingapp TO readwrite;
GRANT USAGE, CREATE ON SCHEMA turingschema TO readwrite;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA turingschema TO readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA turingschema GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO readwrite;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA turingschema TO readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA turingschema GRANT USAGE ON SEQUENCES TO readwrite;

-- Users creation
CREATE USER turing_ro WITH PASSWORD 'cumpRUSTAWnS';
CREATE USER turing_rw WITH PASSWORD 'aLENTowaDati';

-- Grant privileges to users
GRANT turing_ro TO readonly;
GRANT turing_rw TO readwrite;

GRANT all ON SCHEMA turingschema TO turing_rw ;

GRANT all ON ALL TABLES IN SCHEMA turingschema TO turing_rw ;

GRANT all ON ALL SEQUENCES IN SCHEMA turingschema TO turing_rw ;



SET search_path TO turingschema;
CREATE TYPE usertypes AS ENUM ('student', 'mentor', 'admin');
CREATE TYPE statetypes AS ENUM ('pending', 'in_progress', 'completed', 'canceled');
CREATE TABLE users (
	id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
	email varchar(30) NOT NULL,
	password varchar(100) NOT NULL,
    usertype usertypes NOT NULL,
	starttime smallint DEFAULT 9,
	endtime smallint DEFAULT 18,
	active boolean DEFAULT true
);


CREATE INDEX user_usertype_idx ON users (usertype);
CREATE INDEX user_active_idx ON users (active);
CREATE INDEX user_usertype_active_idx ON users (usertype, active);

CREATE TABLE reviews (
	id serial PRIMARY KEY,
    statetype statetypes NOT NULL,
	timestart integer NOT NULL,
    timeend integer NOT NULL,
	score smallint DEFAULT 0,
	mentor_id integer references users(id) NOT NULL,
	student_id integer references users(id) NOT NULL,
	comments varchar(1024)
);


CREATE INDEX reviews_statetypes_idx ON reviews (statetype);
CREATE INDEX reviews_timestart_idx ON reviews (mentor_id, timestart);
CREATE INDEX reviews_timeend_idx ON reviews (mentor_id, timeend);
CREATE INDEX reviews_statetype_score_idx ON reviews (statetype, score);

-- Admin user seed :: email: admin1@example.com pwd:sdjhsdj
INSERT INTO turingschema.users ("name", email, "password", usertype, starttime, endtime, active) VALUES('Admin1', 'admin1@example.com', '$2a$10$rFLS8a5zMn8Z1JQbFtU4..lcO3RJXbYjW7HLXrae2o80CPCc9KDxe', 'admin', 9, 18, true);