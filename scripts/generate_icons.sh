#!/usr/bin/bash

set -e

# Change to the parent directory
cd "${0%/*}/.."

convert -background none favicon.svg -size 512x512 ./static/favicon-512x512.png
convert -background none favicon.svg -size 192x192 ./static/favicon-192x192.png
convert -background none favicon.svg -size 64x64 ./static/favicon.png
