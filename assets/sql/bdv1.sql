DROP TABLE ultra.requests;

DROP TABLE ultra.users;

CREATE TABLE ultra.users
(
    id serial NOT NULL,
    code integer,
    name character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    roles character varying[] COLLATE pg_catalog."default",
    company_cpf_cnpj character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE ultra.users
    OWNER to postgres;
	
DROP TABLE ultra.request_types;

CREATE TABLE ultra.request_types
(
    id integer NOT NULL,
    description character varying(250) COLLATE pg_catalog."default",
    request_group character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT request_types_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE ultra.request_types
    OWNER to postgres;



CREATE TABLE ultra.requests
(
    id serial NOT NULL,
    id_user_requester integer NOT NULL,
    id_user_requested integer NOT NULL,
    id_request_type integer NOT NULL,
    response boolean,
    response_message character varying(500) COLLATE pg_catalog."default",
    request_message character varying(500) COLLATE pg_catalog."default",
    request_date timestamp without time zone,
    response_date timestamp without time zone,
    request_detail character varying(1000) COLLATE pg_catalog."default",
    CONSTRAINT requests_pkey PRIMARY KEY (id),
    CONSTRAINT fk_request_request_type FOREIGN KEY (id_request_type)
        REFERENCES ultra.request_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_request_user_requested FOREIGN KEY (id_user_requested)
        REFERENCES ultra.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_request_user_sended FOREIGN KEY (id_user_requester)
        REFERENCES ultra.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE ultra.requests
    OWNER to postgres;
	
	
INSERT INTO ultra.users (code, name, password, email, roles, company_cpf_cnpj) 
                 VALUES (1, 'Administrador', '489f1a77333d35fa6b6aa0af05858b23', 'balena@ultrasistemas.com.br', '{"ADMIN"}', '06225416927');
                