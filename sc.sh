set -e
#find ./README.md ./docs/ -regex ".*.[md|mdx]" -print0 | xargs -0 -n1 ./node_modules/markdown-link-check/bin/markdown-link-check --config linkcheck.config.json -v
find ..md ./docs/ -regex ".*.[md|mdx]" -print0 | xargs -0 -n1 sh -c './node_modules/markdown-link-check/bin/markdown-link-check --config linkcheck.config.json -v "$1"; echo "File: $1; Exit code: $?"' _ 
./node_modules/markdown-link-check/bin/markdown-link-check --config linkcheck.config.json -v ./docs/operating/operator-introduction.md
./node_modules/markdown-link-check/bin/markdown-link-check --config linkcheck.config.json -v ./docs/quick_start.mdx