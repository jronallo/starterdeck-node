#! /usr/bin/env bash

# markdown_to_slides.sh

# Converts a markdown file into a DZslides presentation. Pandoc must be installed. Must be run from root like scripts/markdown_to_slides.sh

# First create the HTML version of the slides that are self-contained.
pandoc -w dzslides --include-after-body=templates/include-after-body-slides.html --standalone --self-contained slides/slides.md > slides/slides-temp.html

# The line above could be changed to output to presentation-tmp.html and this line uncommented to use sed to insert some
# other text. Sometimes this is necessary when a script can't be turned into a data URI by pandoc.
sed 's/<!-- insert before include-after-body-slides -->/<script src="\/socket.io\/socket.io.js" type="text\/javascript"><\/script><script src="http:\/\/localhost:35729\/livereload.js"><\/script>/' slides/slides-temp.html > slides/slides.html


# Create the handouts page
# Run Ruby script to parse nonselfcontained version and extract out just the audience notes.
./scripts/slides_to_handouts.rb slides/slides-temp.html > slides/handouts.md

# Use pandoc to convert the handouts.md file into a self-contained HTML file
pandoc --template templates/handouts.html --section-divs -w html5 slides/handouts.md > slides/handouts.html


# Create a single page version of the slides. Great for reading through all of your notes.
pandoc --include-after-body=templates/include-after-body-singlepage.html --standalone --self-contained --section-divs slides/slides.md > slides/singlepage.html


# Clean up temp files
rm slides/slides-temp.html
