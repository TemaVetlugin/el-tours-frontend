#bash
cd ./.docker
docker-compose -f docker-compose.local.yml build nextjs
docker-compose -f docker-compose.local.yml stop
docker-compose -f up -d
