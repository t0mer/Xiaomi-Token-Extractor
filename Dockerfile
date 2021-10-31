
FROM techblog/flask:latest

LABEL maintainer="tomer.klein@gmail.com"

ENV PYTHONIOENCODING=utf-8
ENV LANG=C.UTF-8
ENV XIA_USER=""
ENV XIA_PASS=""
ENV XIA_SRV=""

     
RUN mkdir -p /opt/xiasrv
 
COPY xiasrv /opt/xiasrv
   
EXPOSE 8080
 
ENTRYPOINT ["/usr/bin/python3", "/opt/xiasrv/xiaomi.py"]
