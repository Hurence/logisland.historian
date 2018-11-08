FROM python:3.6

RUN pip install opcua

ADD scripts/ .
RUN chmod +x ./server-custom-object.py

EXPOSE 4840

CMD ["python", "server-example.py"]