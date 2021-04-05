
FROM ubuntu:18.04

LABEL maintainer="tomer.klein@gmail.com"

ENV PYTHONIOENCODING=utf-8
ENV LANG=C.UTF-8
ENV XIA_USER=""
ENV XIA_PASS=""
ENV XIA_SRV=""

RUN apt update -yqq
RUN apt -yqq install python3-pip
    
RUN  pip3 install flask --no-cache-dir && \
     pip3 install flask_restful --no-cache-dir && \
     pip3 install loguru --no-cache-dir && \
     pip3 install requests --no-cache-dir
     
 RUN mkdir -p /opt/xiasrv
 
 COPY xiasrv /opt/xiasrv
   
 EXPOSE 8080
 
 ENTRYPOINT ["/usr/bin/python3", "/opt/xiasrv/xiaomi.py"]
