#restore mongo db
docker-compose exec -T mongodb mongorestore -u=admin -p=28121995Vlad --authenticationDatabase=admin --archive --gzip < ./backups/dump.gz 

#backup mongo db
docker-compose exec -T mongodb mongodump -u=admin -p=28121995Vlad --authenticationDatabase=admin --archive --gzip --db ezserver > ./backups/dump.gz