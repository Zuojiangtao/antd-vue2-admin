#Docker地址及路径
FROM hub.cloud.XXXX.com/projectName/library/nginx:lastest

WORKDIR /usr/share/nginx/html
COPY deploy/default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html
EXPOSE 80
