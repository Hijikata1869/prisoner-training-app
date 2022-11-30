#!/bin/bash
mv config/database.yml.staging config/database.yml
bundle exec rails server -e production