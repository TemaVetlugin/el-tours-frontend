#bash
cd ./.docker
docker-compose build nextjs
docker-compose stop
docker-compose -f docker-compose.yml -f docker-compose.ssl.password.yml up -d
docker image prune -a -f
