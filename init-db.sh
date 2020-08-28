#!/bin/bash

set -e

# TODO: avoid granting superuser to the microservice admin users.
#   It is currently needed as you cannot add extensions without it.
#
#   Alternatively: could just set up all extensions here, but that requires hard coding that shouldn't be done.
#
psql -v ON_ERROR_STOP=1 -U ${POSTGRES_USER} <<-EOSQL
    CREATE DATABASE "${NOTES_ROOT_DATABASE}";
    GRANT ALL PRIVILEGES ON DATABASE "${NOTES_ROOT_DATABASE}" TO ${ROOT_DATABASE_USER};
EOSQL
