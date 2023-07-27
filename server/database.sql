CREATE TABLE food (
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR,
    uid VARCHAR,
    image VARCHAR,
    category VARCHAR,
    price INT,
    "desc" VARCHAR,
    PRIMARY KEY(id)
);

CREATE TABLE review (
    id uuid DEFAULT uuid_generate_v4(),
    rating INT,
    food_id uuid,
    username VARCHAR,
    comment VARCHAR,
    uid VARCHAR,
    PRIMARY KEY(id),
    FOREIGN KEY (food_id) REFERENCES food(id)
);