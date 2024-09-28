CREATE TABLE flyway_schema_history
(
    installed_rank INTEGER                                   NOT NULL,
    version        VARCHAR(50),
    description    VARCHAR(200)                              NOT NULL,
    type           VARCHAR(20)                               NOT NULL,
    script         VARCHAR(1000)                             NOT NULL,
    checksum       INTEGER,
    installed_by   VARCHAR(100)                              NOT NULL,
    installed_on   TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    execution_time INTEGER                                   NOT NULL,
    success        BOOLEAN                                   NOT NULL,
    CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank)
);

CREATE INDEX flyway_schema_history_s_idx ON flyway_schema_history (success);

CREATE SEQUENCE IF NOT EXISTS item_image_seq AS bigint START WITH 1 INCREMENT BY 50 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE SEQUENCE IF NOT EXISTS item_seq AS bigint START WITH 1 INCREMENT BY 50 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE items
(
    id            BIGINT         NOT NULL,
    name          VARCHAR(50)    NOT NULL,
    description   VARCHAR(700)   NOT NULL,
    initial_price numeric(10, 2) NOT NULL,
    start_date    date           NOT NULL,
    end_date      date           NOT NULL,
    CONSTRAINT pk_items PRIMARY KEY (id)
);

CREATE TABLE items_images
(
    id        BIGINT        NOT NULL,
    name      VARCHAR(100)  NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    item_id   BIGINT        NOT NULL,
    CONSTRAINT pk_items_images PRIMARY KEY (id)
);

ALTER TABLE items_images
    ADD CONSTRAINT fk_items_images_on_item FOREIGN KEY (item_id) REFERENCES items (id) ON UPDATE NO ACTION ON DELETE NO ACTION;