#!/usr/bin/env sh
set -e

if [ "$1" = 'migrate' ]
then
  echo "### Attempting SQL migrations ###"
  npx sequelize db:migrate
fi

if [ "$NODE_ENV" == "dev" ]
then
    exec npm run dev
else
    exec npm run start
fi