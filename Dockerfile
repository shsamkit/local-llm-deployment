FROM --platform=linux/amd64 python:3.9.21-bookworm

RUN apt-get update && apt-get install -y \
    vim \
    && rm -rf /var/lib/apt/lists/*

RUN pip install gpt4all

