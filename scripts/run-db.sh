docker run --rm -d -p 3306:3306 --name mysql-docker-container -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=shop -e MYSQL_USER=root -e MYSQL_PASSWORD=root mysql/mysql-server:latest
