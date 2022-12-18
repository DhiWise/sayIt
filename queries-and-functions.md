# Queries and Functions

## Create tables:

Run the following query to **create tables** in your supabase project.

```sql
create or replace function create_tables()
returns void
language sql
as $$

create table profiles(id bigint generated always as identity primary key, created_at timestamptz default now(),name text, email text unique not null,updated_at timestamptz, avtar text, type numeric default 2, password varchar, auth_user_id uuid references auth.users,is_active boolean default true);

create table companies(id bigint generated always as identity primary key, created_at timestamptz default now(),name text, sub_domain text,updated_at timestamptz);

create table boards(id bigint generated always as identity primary key, created_at timestamptz default now(),name text unique not null, is_public boolean default true, updated_at timestamptz);

create table comments(id bigint generated always as identity primary key, created_at timestamptz default now(),comments text not null, user_id bigint not null references profiles on delete cascade, post_id bigint not null references posts on delete cascade, parent_id bigint references comments, images text, is_public boolean default false,updated_at timestamptz);

create table posts(id bigint generated always as identity primary key, created_at timestamptz default now(),title text not null, description text, board_id bigint not null references boards on delete cascade, status numeric, user_id bigint not null references profiles on delete cascade, owner_id bigint references profiles on delete cascade, updated_at timestamptz default now(),is_deleted boolean default false, updated_by bigint references profiles on delete cascade);

create table tags(id bigint generated always as identity primary key, created_at timestamptz default now(),name text unique not null, updates_at timestamptz);

create table post_tag(id bigint generated always as identity primary key, created_at timestamptz default now(), tag_id bigint references tags on delete cascade, post_id bigint references posts on delete cascade,updated_at timestamptz);

create table upvotes(id bigint generated always as identity primary key, created_at timestamptz default now(), user_id bigint not null references profiles on delete cascade, post_id bigint not null references posts on delete cascade,updated_at timestamptz);

create table comment_image(id bigint generated always as identity primary key, created_at timestamptz default now(), image text, comment_id bigint references comments on delete cascade, post_id bigint references posts on delete cascade, updated_at timestamptz);

create table notifications(id bigint generated always as identity primary key,created_at timestamptz default now(),user_id bigint references profiles on delete cascade ,board_id bigint references boards on delete cascade, post_id bigint references posts on delete cascade, activity text, date timestamptz, is_read boolean default false, action_user bigint references profiles, owner_id bigint references profiles on delete cascade,updated_at timestamptz);

$$;

SELECT from create_tables();
```

### **Create public users:**

Run the following query to create **create_public_user** function:

```sql
create or replace function public.create_public_user()
returns trigger as $$
begin
  IF NOT EXISTS (SELECT * FROM public.profiles p WHERE p.email = new.email) AND new.raw_user_meta_data['name'] is not null THEN
  insert into public.profiles (auth_user_id, email,name)
  values (new.id, new.email,trim(both '"' from new.raw_user_meta_data['name']::text));
END IF;
  return new;
end;
$$ language plpgsql security definer;
```

<br/>

### 1️⃣ Post list with filters:

Run the following query to create **post_list_with_filter** function:

```sql
drop function if exists post_list_with_filter;
create function post_list_with_filter(
  req_user bigint, 
  req_activity text[] default null, 
  req_limit int default 10, 
  req_offset int default 0
) returns table(
  id bigint,
  title text,
  description text, 
  status numeric,
  created_at timestamp with time zone, 
  comment_count bigint,
  upvote_count bigint,
  is_voted boolean,
  is_commented boolean,
  is_self_post boolean
  
) as $$
DECLARE 
    joinClause text := '';
    whereClause text := '';
    optionalSelectClause text := '';
BEGIN
    IF req_user is not null then 
        IF array_length(req_activity, 1) is null then 
            req_activity := ARRAY[ 'post', 'comment', 'upvote' ];
        END IF;

        IF 'post' = ANY(req_activity) then 
            whereClause = 'posts.user_id = ' || req_user;
        ELSE
            whereClause = 'posts.id is not null';
        END IF;

        IF 'upvote' = ANY(req_activity) AND NOT ('comment' = ANY(req_activity)) then 
            joinClause = joinClause || ' left outer  join upvotes up on up.post_id = posts.id and up.user_id = ' || req_user;
            IF 'post' = ANY(req_activity) then 
                whereClause = whereClause || ' or';
            ELSE 
                whereClause = whereClause || ' and';
            END IF;
            whereClause = whereClause || ' up.user_id =' || req_user;
        END IF;

        IF 'comment' = ANY(req_activity) AND NOT ('upvote' = ANY(req_activity)) then
            joinClause = joinClause || ' left outer join comments cs on cs.post_id  = posts.id and cs.user_id = ' || req_user;
            IF 'post' = ANY(req_activity) then 
                whereClause = whereClause || ' or';
            ELSE 
                whereClause = whereClause || ' and';
            END IF;
            whereClause = whereClause || ' cs.user_id = ' || req_user;
        END IF;

        IF 'upvote' = ANY(req_activity) AND 'comment' = ANY(req_activity) then
            joinClause = joinClause || ' left outer  join upvotes up on up.post_id = posts.id and up.user_id = ' || req_user || ' left outer join comments cs on cs.post_id  = posts.id and cs.user_id = ' || req_user;
            
            IF 'post' = ANY(req_activity) then 
                whereClause = whereClause || ' or';
            ELSE 
                whereClause = whereClause || ' and';
            END IF;

            whereClause = whereClause || ' (up.user_id =' || req_user || ' or cs.user_id = ' || req_user || ')';
        END IF;

            optionalSelectClause =', CASE WHEN upc.id IS NULL THEN false ELSE true END AS is_voted, CASE WHEN cc.id IS NULL THEN false ELSE true END AS is_commented, CASE WHEN posts.user_id = '|| req_user ||' THEN true ELSE false END AS is_self_post ';
            
            joinClause = joinClause || ' left outer JOIN upvotes upc ON posts.id = upc.post_id AND upc.user_id = ' || req_user || ' left outer JOIN comments cc ON posts.id = cc.post_id AND cc.user_id = ' || req_user;

    END IF;
    return query execute 'SELECT distinct posts.id, posts.title, posts.description,posts.status, posts.created_at, c.comment_count, u.upvote_count'||optionalSelectClause ||' FROM posts left outer JOIN (select count(comments.id) as comment_count, post_id from comments group by post_id) c ON posts.id = c.post_id left outer JOIN (select count(upvotes.id) as upvote_count, post_id from upvotes group by post_id) u ON posts.id = u.post_id' || joinClause || ' where ' || whereclause || ' order by posts.created_at desc offset ' || req_offset || ' limit ' || req_limit;
END;
$$ language plpgsql security definer;
```


<br/>


### 2️⃣ User list with sorting:

Run the following query to create **user_list_with_sorting** function:

```sql
drop function if exists user_list_with_sorting;
create function user_list_with_sorting(req_sort_by text default null, req_search text default null, req_limit int default 10, req_offset int default 0) 
returns table(
  id bigint,
  name text,
  item_count bigint,
  max_created_date timestamp WITH time zone
) as $$
DECLARE 
    selectClause text := 'profiles.id, profiles.name';
    joinClause text := '';
    orderClause text := '';
    whereClause text := 'profiles.is_active = true';
BEGIN

IF req_search IS NOT NULL THEN 
   whereClause = whereClause || ' and ( profiles.name ILIKE ''%' || req_search ||'%'' ) ';
END IF;

  IF req_sort_by = 'TOP_VOTERS' THEN 
    selectClause = selectClause || ', count(upvotes.id) as item_count, null::timestamp WITH time zone as max_created_date';
    joinClause  = 'upvotes ON profiles.id = upvotes.user_id';
    orderClause = 'item_count desc NULLS LAST';
  ELSIF req_sort_by = 'TOP_POSTERS' THEN 
    selectClause = selectClause || ', count(posts.id) as item_count, null::timestamp WITH time zone as max_created_date';
    joinClause = 'posts ON profiles.id = posts.user_id';
    orderClause = 'item_count desc NULLS LAST';
  ELSE
    selectClause = selectClause || ', null::bigint as item_count, greatest(MAX(comments.created_at), MAX(upvotes.created_at)) as max_created_date ';
    joinClause = 'comments ON profiles.id = comments.user_id LEFT JOIN upvotes ON profiles.id = upvotes.user_id';
    orderClause = 'max_created_date desc NULLS LAST';
  END IF;
  return query execute 'SELECT '|| selectClause ||' FROM profiles LEFT JOIN '|| joinClause ||' WHERE '|| whereClause ||' GROUP BY profiles.name, profiles.id ORDER BY ' || orderClause ||' OFFSET '|| req_offset ||' limit ' || req_limit;
END;   
$$ language plpgsql security definer;
```


<br/>


### 3️⃣ Post list:

Run the following query to create **post_list** function:

```sql
drop function if exists post_list;
create function post_list(req_board bigint[] default null, req_sort_by text default null, req_user bigint default null, req_status numeric default null, req_search text default null, req_limit int default 10, req_offset int default 0) 
RETURNS table(
  id bigint,
  title text,
  description text,
  status numeric,
  board_id bigint,
  comment_count bigint,
  upvote_count bigint,
  user_upvote_id bigint
)  as $$
DECLARE 
    optionalSelectClause text := ', null::bigint as user_upvote_id';
    joinClause text := '';
    whereClause text := 'posts.is_deleted = false';
    orderClause text := 'posts.created_at desc';
BEGIN

IF req_status IS NOT NULL THEN 
  whereClause = whereClause || ' AND posts.status = '|| req_status;
END IF;

IF array_length(req_board, 1) > 0 then
  whereClause = whereClause || ' AND posts.board_id in ('|| array_to_string(req_board, ',', '*') ||') ';
END IF;

IF req_sort_by = 'TRANDING' THEN 
  joinClause = joinClause || ' left outer JOIN (select count(upvotes.id) as upvote_count ,post_id, DATE( MAX(created_at)) as last_upvoted from upvotes group by post_id) u ON posts.id = u.post_id';
  orderClause = 'u.last_upvoted desc nulls LAST, u.upvote_count';
ELSE
  joinClause = joinClause || ' left outer JOIN (select count(upvotes.id) as upvote_count ,post_id from upvotes group by post_id) u ON posts.id = u.post_id';
END IF;

IF req_user IS NOT NULL THEN 
  optionalSelectClause =', up.id as user_upvote_id';
  joinClause = joinClause || ' left outer JOIN upvotes up ON posts.id = up.post_id AND up.user_id = ' || req_user;
END IF;

IF req_sort_by = 'TOP' THEN
  orderClause = 'u.upvote_count desc nulls LAST';
END IF;

IF req_sort_by = 'OWN' AND req_user IS NOT NULL THEN
  whereClause = whereClause || ' and posts.user_id = ' || req_user; 
END IF;

IF req_search IS NOT NULL THEN 
   whereClause = whereClause || ' and ( posts.title ILIKE ''%' || req_search ||'%'' or posts.description ILIKE ''%'|| req_search ||'%'' ) ';
END IF;

return query execute'SELECT posts.id, posts.title, posts.description,posts.status, posts.board_id, CASE WHEN c.comment_count IS NULL THEN 0 ELSE c.comment_count END AS comment_count, CASE WHEN u.upvote_count IS NULL THEN 0 ELSE u.upvote_count END AS upvote_count'|| optionalSelectClause ||' FROM posts left outer JOIN (select count(comments.id) as comment_count ,post_id from comments group by post_id) c ON posts.id = c.post_id ' ||joinClause ||' WHERE '|| whereClause ||' ORDER BY '|| orderClause || ' limit ' ||  req_limit ||' offset ' || req_offset;

END;   
$$ language plpgsql security definer;
```


<br/>


### 4️⃣ Get board list with post counts

Run the following query to create **boards_with_post_count** function:

```sql
drop function if exists boards_with_post_count;
create function boards_with_post_count(req_user_id bigint default null)
returns table(
  id bigint,
  name text,
  post_count bigint
) as $$
DECLARE 
    whereClause text := 'boards.is_public = true';
BEGIN

IF req_user_id IS NOT NULL THEN
  whereClause = whereClause || '';
END IF;
return query execute 'SELECT boards.id, boards.name, p.post_count FROM boards left outer JOIN (select count(posts.id) as post_count, posts.board_id from posts group by posts.board_id) p ON boards.id = p.board_id where '|| whereClause;
END;   
$$ language plpgsql security definer;
```


<br/>


### 5️⃣ **Insert into Notification table on new Upvotes:**

Run the following query to create **new_upvote** function:

```sql
create or replace function public.new_upvote()
returns trigger as $$
begin
  INSERT INTO notifications(user_id, post_id, board_id, activity, date, action_user)
  values ((SELECT user_id from posts WHERE id = new.post_id), new.post_id, (SELECT board_id from posts WHERE id = new.post_id), 'NEW_UPVOTE', new.created_at, new.user_id);
  return new;
end;
$$ language plpgsql security definer;
```


<br/>


### 6️⃣ **Insert into Notification table on new Comments:**

Run the following query to create **new_comment** function:

```sql
create or replace function public.new_comment()
returns trigger as $$
begin
  INSERT INTO notifications(user_id, post_id, board_id, activity, date, action_user)
  values ((SELECT user_id from posts WHERE id = new.post_id), new.post_id, (SELECT board_id from posts WHERE id = new.post_id), 'NEW_COMMENTS', new.created_at, new.user_id);
  return new;
end;
$$ language plpgsql security definer;
```


<br/>


### 7️⃣ **Insert into Notification table on new Posts:**

Run the following query to create **new_post** function:

```sql
create or replace function public.new_post()
returns trigger as $$
begin
  INSERT INTO notifications(user_id, post_id, board_id, activity, date)
  values (new.user_id, new.id, new.board_id, 'NEW_POSTS', new.created_at);
  return new;
end;
$$ language plpgsql security definer;
```


<br/>


### 8️⃣ **Insert into Notification table on Status updates:**

Run the following query to create **status_updates** function:

```sql
create or replace function public.status_updates()
returns trigger as $$
declare
  oldStaus numeric;
  newUpdtaedBy bigint;
  oldUserId bigint;
begin

if (old.status != new.status)  then
  INSERT INTO notifications(user_id, post_id, board_id, activity, date, action_user)
  values (new.user_id, new.id, new.board_id, 'STATUS_UPDATES', new.updated_at, new.updated_by);
  return new;
end if;
return new;
end;
$$ language plpgsql security definer;
```


<br/>


### 9️⃣ Insert in Upvotes table on New posts:

Run the following query to create **add_in_upvotes** function:

```sql
create or replace function add_in_upvotes() 
returns trigger as $$
begin
  insert into public.upvotes (post_id,user_id)
  values (new.id, new.user_id);
  return new;
end;
$$ language plpgsql security definer;
```