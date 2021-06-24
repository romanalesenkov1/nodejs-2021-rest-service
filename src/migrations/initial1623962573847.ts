import { MigrationInterface, QueryRunner } from 'typeorm';

import bcrypt from 'bcryptjs';

export class initial1623962573847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .query(
        `
    START TRANSACTION;
    SELECT * FROM current_schema();
    SELECT TRUE FROM information_schema.columns WHERE table_name = 'pg_class' and column_name = 'relispartition';
    SELECT * FROM "information_schema"."tables" WHERE ("table_schema" = 'public' AND "table_name" = 'users') OR ("table_schema" = 'public' AND "table_name" = 'tasks') OR ("table_schema" = 'public' AND "table_name" = 'columns') OR ("table_schema" = 'public' AND "table_name" = 'boards');
    SELECT columns.*, pg_catalog.col_description(('"' || table_catalog || '"."' || table_schema || '"."' || table_name || '"')::regclass::oid, ordinal_position) AS description, ('"' || "udt_schema" || '"."' || "udt_name" || '"')::"regtype" AS "regtype", pg_catalog.format_type("col_attr"."atttypid", "col_attr"."atttypmod") AS "format_type" FROM "information_schema"."columns" LEFT JOIN "pg_catalog"."pg_attribute" AS "col_attr" ON "col_attr"."attname" = "columns"."column_name" AND "col_attr"."attrelid" = ( SELECT "cls"."oid" FROM "pg_catalog"."pg_class" AS "cls" LEFT JOIN "pg_catalog"."pg_namespace" AS "ns" ON "ns"."oid" = "cls"."relnamespace" WHERE "cls"."relname" = "columns"."table_name" AND "ns"."nspname" = "columns"."table_schema" ) WHERE ("table_schema" = 'public' AND "table_name" = 'users') OR ("table_schema" = 'public' AND "table_name" = 'tasks') OR ("table_schema" = 'public' AND "table_name" = 'columns') OR ("table_schema" = 'public' AND "table_name" = 'boards');
    SELECT "ns"."nspname" AS "table_schema", "t"."relname" AS "table_name", "cnst"."conname" AS "constraint_name", pg_get_constraintdef("cnst"."oid") AS "expression", CASE "cnst"."contype" WHEN 'p' THEN 'PRIMARY' WHEN 'u' THEN 'UNIQUE' WHEN 'c' THEN 'CHECK' WHEN 'x' THEN 'EXCLUDE' END AS "constraint_type", "a"."attname" AS "column_name" FROM "pg_constraint" "cnst" INNER JOIN "pg_class" "t" ON "t"."oid" = "cnst"."conrelid" INNER JOIN "pg_namespace" "ns" ON "ns"."oid" = "cnst"."connamespace" LEFT JOIN "pg_attribute" "a" ON "a"."attrelid" = "cnst"."conrelid" AND "a"."attnum" = ANY ("cnst"."conkey") WHERE "t"."relkind" IN ('r', 'p') AND (("ns"."nspname" = 'public' AND "t"."relname" = 'users') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'tasks') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'columns') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'boards'));
    SELECT "ns"."nspname" AS "table_schema", "t"."relname" AS "table_name", "i"."relname" AS "constraint_name", "a"."attname" AS "column_name", CASE "ix"."indisunique" WHEN 't' THEN 'TRUE' ELSE'FALSE' END AS "is_unique", pg_get_expr("ix"."indpred", "ix"."indrelid") AS "condition", "types"."typname" AS "type_name" FROM "pg_class" "t" INNER JOIN "pg_index" "ix" ON "ix"."indrelid" = "t"."oid" INNER JOIN "pg_attribute" "a" ON "a"."attrelid" = "t"."oid"  AND "a"."attnum" = ANY ("ix"."indkey") INNER JOIN "pg_namespace" "ns" ON "ns"."oid" = "t"."relnamespace" INNER JOIN "pg_class" "i" ON "i"."oid" = "ix"."indexrelid" INNER JOIN "pg_type" "types" ON "types"."oid" = "a"."atttypid" LEFT JOIN "pg_constraint" "cnst" ON "cnst"."conname" = "i"."relname" WHERE "t"."relkind" IN ('r', 'p') AND "cnst"."contype" IS NULL AND (("ns"."nspname" = 'public' AND "t"."relname" = 'users') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'tasks') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'columns') OR ("ns"."nspname" = 'public' AND "t"."relname" = 'boards'));
    SELECT "con"."conname" AS "constraint_name", "con"."nspname" AS "table_schema", "con"."relname" AS "table_name", "att2"."attname" AS "column_name", "ns"."nspname" AS "referenced_table_schema", "cl"."relname" AS "referenced_table_name", "att"."attname" AS "referenced_column_name", "con"."confdeltype" AS "on_delete", "con"."confupdtype" AS "on_update", "con"."condeferrable" AS "deferrable", "con"."condeferred" AS "deferred" FROM ( SELECT UNNEST ("con1"."conkey") AS "parent", UNNEST ("con1"."confkey") AS "child", "con1"."confrelid", "con1"."conrelid", "con1"."conname", "con1"."contype", "ns"."nspname", "cl"."relname", "con1"."condeferrable", CASE WHEN "con1"."condeferred" THEN 'INITIALLY DEFERRED' ELSE 'INITIALLY IMMEDIATE' END as condeferred, CASE "con1"."confdeltype" WHEN 'a' THEN 'NO ACTION' WHEN 'r' THEN 'RESTRICT' WHEN 'c' THEN 'CASCADE' WHEN 'n' THEN 'SET NULL' WHEN 'd' THEN 'SET DEFAULT' END as "confdeltype", CASE "con1"."confupdtype" WHEN 'a' THEN 'NO ACTION' WHEN 'r' THEN 'RESTRICT' WHEN 'c' THEN 'CASCADE' WHEN 'n' THEN 'SET NULL' WHEN 'd' THEN 'SET DEFAULT' END as "confupdtype" FROM "pg_class" "cl" INNER JOIN "pg_namespace" "ns" ON "cl"."relnamespace" = "ns"."oid" INNER JOIN "pg_constraint" "con1" ON "con1"."conrelid" = "cl"."oid" WHERE "con1"."contype" = 'f' AND (("ns"."nspname" = 'public' AND "cl"."relname" = 'users') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'tasks') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'columns') OR ("ns"."nspname" = 'public' AND "cl"."relname" = 'boards')) ) "con" INNER JOIN "pg_attribute" "att" ON "att"."attrelid" = "con"."confrelid" AND "att"."attnum" = "con"."child" INNER JOIN "pg_class" "cl" ON "cl"."oid" = "con"."confrelid"  AND "cl"."relispartition" = 'f'INNER JOIN "pg_namespace" "ns" ON "cl"."relnamespace" = "ns"."oid" INNER JOIN "pg_attribute" "att2" ON "att2"."attrelid" = "con"."conrelid" AND "att2"."attnum" = "con"."parent";
    SELECT * FROM "information_schema"."tables" WHERE "table_schema" = current_schema() AND "table_name" = 'typeorm_metadata';
    SELECT * FROM current_schema();
    CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"));
    CREATE TABLE "tasks" ("id" character varying NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" character varying, "boardId" character varying, "columnId" character varying, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"));
    CREATE TABLE "columns" ("id" character varying NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" character varying, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"));
    CREATE TABLE "boards" ("id" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"));
    ALTER TABLE "columns" ADD CONSTRAINT "FK_ac92bfd7ba33174aabef610f361" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    COMMIT;
    `
      )
      .then(() =>
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('users')
          .values({
            id: '0b7d06fc-bc10-47b7-9f55-9a3d69b0a30e',
            name: 'admin',
            login: 'admin',
            password: bcrypt.hashSync('admin'),
          })
          .execute()
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
    DROP table users;
    DROP table columns;
    DROP table tasks;
    DROP table boards;
        `
    );
  }
}
