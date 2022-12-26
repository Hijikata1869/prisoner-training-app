FROM ruby:2.7.5

RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

RUN apt-get update -qq && apt-get install -y nodejs yarn default-mysql-client-core

ARG RAILS_MASTER_KEY
ENV RAILS_MASTER_KEY ${RAILS_MASTER_KEY}
ENV RAILS_ENV=production

WORKDIR /prisoner-training-app

COPY ./Gemfile /prisoner-training-app/Gemfile
COPY ./Gemfile.lock /prisoner-training-app/Gemfile.lock

RUN gem install bundler
RUN bundle install --path=vendor/bundle

COPY . /prisoner-training-app

VOLUME /prisoner-training-app/tmp

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["bundle", "exec", "rails", "server"]
