FROM centos:latest

LABEL vendor="Danbi Korea CO., LTD."
LABEL maintainer="ec.park@danbicorp.com"

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 16.13.2
# install nvm
RUN mkdir /usr/local/nvm
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash 
# install node and npm
RUN source $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default
# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

COPY . /home/ec2-user/danbi-schedulers

RUN sh /home/ec2-user/danbi-schedulers/services/tester.install.sh

CMD ["/usr/sbin/init"]
