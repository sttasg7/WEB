DROP DATABASE IF EXISTS web21;
CREATE DATABASE web21;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
username VARCHAR(100) NOT NULL PRIMARY KEY,
email varchar(300) UNIQUE NOT NULL,
password varchar(200) NOT NULL,
admin int(1) NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS har_data;
CREATE TABLE IF NOT EXISTS har_data
(
    username_user VARCHAR(100) NOT NULL,
    starteddatetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    serveripaddress VARCHAR(100),
    wait VARCHAR(100),
    method VARCHAR(100),
    domain VARCHAR(100),
    status VARCHAR(100),
    statustext VARCHAR(100),
    content_type VARCHAR(100),
    cache_control VARCHAR(100),
    pragma VARCHAR(100),
    expires VARCHAR(100),
    age VARCHAR(100),
    last_modified VARCHAR(100),
    host VARCHAR(100),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userip VARCHAR(100),
    isp VARCHAR(100),
    city VARCHAR(100),
    latitude_city  VARCHAR(100),
    longitude_city VARCHAR(100),
    FOREIGN KEY (username_user)
    REFERENCES users (username) ON UPDATE CASCADE ON DELETE CASCADE
   
);

DROP TABLE IF EXISTS serverloc;
CREATE TABLE IF NOT EXISTS serverloc
(   
    s_ip VARCHAR(100) UNIQUE,
    s_lat VARCHAR(100),
    s_lon VARCHAR(100)
);

CREATE INDEX in1 ON har_data (username_user);
CREATE INDEX in2 ON har_data (content_type);
CREATE INDEX in3 ON har_data (cache_control);
CREATE INDEX in4 ON har_data (isp);
CREATE INDEX in5 ON har_data (age);
CREATE INDEX in6 ON har_data (serveripaddress);
CREATE INDEX in7 ON serverloc (s_ip);

INSERT INTO users VALUES ('admin','admin','admin',1);