-- 用户表
CREATE TABLE public."user"
(
    name text NOT NULL,
    password text NOT NULL,
    salt text NOT NULL,
    id bigserial NOT NULL,
    PRIMARY KEY (id)
);


-- 用户数据表

CREATE TABLE public.user_data
(
    data_id text NOT NULL,
    user_id bigint NOT NULL,
    tag text[],
    title text NOT NULL,
    short text,
    thumb text,
    update_at timestamp without time zone default now(),
    created_at timestamp without time zone default now(),
    PRIMARY KEY (data_id)
);

-- 用户数据schema
create schema data;

