# postgres CLI
 login into the console. 
`sudo su - postgres`

Enter the PostgreSQL console with:
`pg_ctl start`, 
or 
`psql`

Stop Server wtih
`pg_ctl stop`

If you see this prompt you're in: `postgres=#`

# Interacting with the DB from inside postgres

To create a new database from inside postgres
`CREATE DATABASE db_name;`

Or from the terminal, outside postgres=# 
(note: sometimes it won't show up right away with \l but you can still connect)
`createdb my_test_db_name`

To list all the databases in the server:
`\l`, `\list`

To delete a database (warning zone):
`DROP DATABASE db_name;`

To connect to a database run:
`\c db_name`, `\connect db_name`

and you should see:
You are now connected to database "family" as user "postgres"

# Interacting with tables
Once connected to a database you can list all its tables with:
`\dt`

This command will give you a representation of all the tables in the database:

          List of relations
 Schema |   Name   | Type  |  Owner   
--------+----------+-------+----------
 public | daughter | table | postgres
 public | mother   | table | postgres
(2 rows)


To see its columns, run:
`\d table_name`

This command will give you a complete description of the table:

                                      Table "public.daughter"
   Column   |          Type          | Collation | Nullable |               Default                
------------+------------------------+-----------+----------+--------------------------------------
 id         | smallint               |           | not null | nextval('daughter_id_seq'::regclass)
 first_name | character varying(254) |           | not null | 
 last_name  | character varying(254) |           | not null | 
 mother_id  | integer                |           | not null | 
Indexes:
    "daughter_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_mother_id" FOREIGN KEY (mother_id) REFERENCES mother(id)


You can see every column in the table with the corresponding type. If there is any primary or foreign key you'll see them as well.

# Roles
Database users can interact, modify, update, and see databases. In PostgreSQL they're called roles. To create a new user from the PostgreSQL console run:
`CREATE ROLE my_user WITH LOGIN PASSWORD 'my_password';`

List roles with 
`\du`

Drop role with 
postgres=# `DROP ROLE name`, or from terminal `dropuser name`

PostgreSQL roles may own one or more database. Once you create a role you can assign an entire database to it:

`CREATE DATABASE my_database WITH OWNER my_user;`
When you're done with databases, roles, and tables you can finally exit the console with:
`\q`

# Scripts
Fill (seed) an already made db with tables (or drop them) by running from
TERMINAL
`psql -U username -d db_name -f ./sql-script.sql`

(you may have to execute this in heroku cli if migration scrip is giving an error)
edit, copy and past this in:
`psql -U evxxdudvttijxs -d dae3iadu4o5brv -f ./migrations/002.do.create_user_prefs_table.sql`
`psql -U postgres -d spiral -f ./migrations/002.do.create_user_prefs_table.sql`


-f ./migrations/001.do.create-table.sql

In a script.sql use keyword BEGIN; and COMMIT; to wrap multiple scripts you want
treated as one

# Getting help
`\h`, or for all available commands`\?`

# SQL SETUP



# KNEX
npm i knex
npm i pg (this is the driver)

const knexInstance = knex({
client: 'pg',
connection:  process.env.DB_URL
})

# KNEX Query
knexInstance
.select('column_name', column_name' ...)
.from('table_name')
.where(conditional)
.then(result => {
    
  })





