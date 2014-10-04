#! /usr/bin/env bash

# markdown_to_slides.sh

# Converts a markdown file into a DZslides presentation. Pandoc must be installed. Must be run from root like scripts/markdown_to_slides.sh

mkdir -p public/slides
mkdir -p public/slides-ex
mkdir -p public/handouts
mkdir -p public/singlepage

# First create the HTML version of the slides that use external assets. This allows
# the page to be reloaded much faster.
pandoc -w dzslides --include-after-body=templates/include-after-body-slides.html --standalone slides/slides.md > tmp/slides-external-temp.html

# Insert the external assets we need
sed 's/<!-- insert before include-after-body-slides -->/<script src="\/socket.io\/socket.io.js" type="text\/javascript"><\/script><script src="http:\/\/localhost:35729\/livereload.js"><\/script>/' tmp/slides-external-temp.html > tmp/slides-external-temp2.html

# For the external version we also need to change some paths to work correctly with Node.
sed 's/public\/assets/\/assets/g' tmp/slides-external-temp2.html > public/slides-ex/index.html

# Next create the HTML version of the slides that are self-contained.
pandoc -w dzslides --include-after-body=templates/include-after-body-slides.html --standalone --self-contained slides/slides.md > tmp/slides-temp.html
sed 's/public\/assets/\/assets/g' tmp/slides-temp.html > tmp/slides-temp2.html
# We need these scripts included separately so they're not included as data blobs otherwise
# the external synching wont' work.
sed 's/<!-- insert before include-after-body-slides -->/<script src="\/socket.io\/socket.io.js" type="text\/javascript"><\/script><script src="http:\/\/localhost:35729\/livereload.js"><\/script>/' tmp/slides-temp2.html > public/slides/index.html


# Create the handouts page
# Run Ruby script to parse nonselfcontained version and extract out just the audience notes.
./scripts/slides_to_handouts.rb tmp/slides-temp.html > tmp/handouts.md

# Use pandoc to convert the handouts.md file into a self-contained HTML file
pandoc --template templates/handouts.html --section-divs -w html5 tmp/handouts.md > public/handouts/index.html


# Create a single page version of the slides. Great for reading through all of your notes.
pandoc --include-after-body=templates/include-after-body-singlepage.html --standalone --self-contained --section-divs slides/slides.md > public/singlepage/index.html


# Clean up temp files
rm tmp/slides-temp.html
rm tmp/slides-temp2.html
rm tmp/slides-external-temp.html
rm tmp/slides-external-temp2.html
rm tmp/handouts.md

echo -ne "Built! `date`"