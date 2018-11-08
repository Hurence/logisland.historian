FROM python:3.6

RUN pip install opcua

ADD scripts/ .

EXPOSE 4840

CMD ["python", "server-example.py"]