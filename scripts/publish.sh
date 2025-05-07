#!/usr/bin/bash

set -e

# Change to the parent directory
cd "${0%/*}/.."

git add -A
git commit -m "Bulid"
git push
