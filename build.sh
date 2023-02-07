#!/bin/bash

release_tag="0.1.0"
url="https://github.com/luckasRanarison/jichan-db/releases/download/${release_tag}/jichan.db"

echo "Fetching database..."

if command -v curl > /dev/null 2>&1; then
  curl -LJO "$url" 
else
  if command -v wget > /dev/null 2>&1; then
    wget "$url" 
  else
    echo "Error: curl and wget are not installed."
    exit 1
  fi
fi

mkdir bin
mkdir bin/db
mv jichan.db bin/db/

echo "Building..."
npm run build