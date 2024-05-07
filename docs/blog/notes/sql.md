# SQL

## mysqldump 迁移数据库

```bash
docker exec <container-id> mysqldump -u <user> -p<password> <database> > ./src/migration/backup.sql
```
