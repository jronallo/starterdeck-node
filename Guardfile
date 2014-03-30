guard 'livereload' do
  watch("slides/slides.html")
end

guard 'sass', :input => 'slides/assets/stylesheets'

guard :shell do
  # If any of these change run the script to build slides/slides.html
  watch('slides/assets/stylesheets/slides.css')          {puts `./scripts/markdown_to_slides.sh`}
  watch('slides/assets/stylesheets/slides-singlepage.css') {puts `./scripts/markdown_to_slides.sh`}
  watch(%r{slides/assets/javascripts/.*.js})             {puts `./scripts/markdown_to_slides.sh`}
  watch('scripts/markdown_to_slides.sh')          {puts `./scripts/markdown_to_slides.sh`}
  watch('scripts/slides_to_handouts.rb') {puts `./scripts/markdown_to_slides.sh`}

  watch(%r{templates/.*})                                {puts `./scripts/markdown_to_slides.sh`}

  watch('slides/slides.md')                               {puts `./scripts/markdown_to_slides.sh`}

  watch(%r{slides/assets/images/*\.(jpg|png)})           {puts `./scripts/markdown_to_slides.sh`}

  # watch('slides/slides-temp-nonselfcontained.html') {puts `./scripts/slides_to_handouts.rb`}

  # watch('slides/slides.html') {`cp slides/slides.html ../prelim_inventory/source/presentations/DIRECTORY_OF_PRESENTATION/slides.html; echo "Moved presentation to blog!"`}
end
