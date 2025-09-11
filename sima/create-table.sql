DROP TABLE IF EXISTS 
tbcampotabela,
tbsensor,
tbsima,
tbestacao
CASCADE;

CREATE TABLE tbsensor (
  idSensor INTEGER,
  nome VARCHAR(30) NOT NULL,
  fabricante VARCHAR(30) NULL,
  modelo VARCHAR(30) NULL,
  faixa VARCHAR(60) NULL,
  precisao VARCHAR(120) NULL,
  PRIMARY KEY(idSensor)
);

CREATE TABLE tbestacao (
  idestacao CHAR(6) NOT NULL,
  idhexadecimal CHAR(5) NULL,
  rotulo VARCHAR(50) NULL,
  lat FLOAT NULL,
  lng FLOAT NULL,
  inicio DATE NULL,
  fim DATE NULL,
  PRIMARY KEY(idestacao)
);

CREATE TABLE tbsima (
  idsima SERIAL NOT NULL,
  idestacao CHAR(6) NOT NULL,
  datahora TIMESTAMP NOT NULL,
  regno INTEGER NULL,
  nofsamples INTEGER  NULL,
  proamag FLOAT NULL,
  dirvt FLOAT NULL,
  intensvt FLOAT NULL,
  u_vel FLOAT NULL,
  v_vel FLOAT NULL,
  tempag1 FLOAT NULL,
  tempag2 FLOAT NULL,
  tempag3 FLOAT NULL,
  tempag4 FLOAT NULL,
  tempar FLOAT NULL,
  ur FLOAT NULL,
  tempar_r FLOAT NULL,
  pressatm FLOAT NULL,
  radincid FLOAT NULL,
  radrefl FLOAT NULL,
  bateria FLOAT NULL,
  sonda_temp FLOAT NULL,
  sonda_cond FLOAT NULL,
  sonda_DOsat FLOAT NULL,
  sonda_DO FLOAT NULL,
  sonda_pH FLOAT NULL,
  sonda_NH4 FLOAT NULL,
  sonda_NO3 FLOAT NULL,
  sonda_turb FLOAT NULL,
  sonda_chl FLOAT NULL,
  sonda_bateria FLOAT NULL,
  corr_norte FLOAT NULL,
  corr_leste FLOAT NULL,
  co2_low FLOAT NULL,
  co2_high FLOAT NULL,
  precipitacao FLOAT NULL,
  PRIMARY KEY(idsima)
);

CREATE TABLE tbcampotabela (
  idcampotabela INTEGER NOT NULL,
  idSensor INTEGER NULL,
  nomecampo VARCHAR(30) NULL,
  rotulo VARCHAR(32) NULL,
  unidademedida VARCHAR(8) NULL,
  ordem INTEGER NULL,
  PRIMARY KEY(idcampotabela)
);
