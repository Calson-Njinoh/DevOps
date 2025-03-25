#!/bin/sh

#this script waits for the Postgres container to start before it connects to the host port 

set -e

HOST=${POSTGRES_HOST:-postgres-service}
PORT=${POSTGRES_PORT:-5432}

echo "⏳ Waiting for Postgres at $HOST:$PORT..."

until nc -z $HOST $PORT; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "✅ Postgres is up - executing command"

exec "$@"
