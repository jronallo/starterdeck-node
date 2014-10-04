group :fast do
  guard 'livereload', grace_period: 0.5, apply_css_live: false do
    watch("slides/slides.html")
    watch("slides/slides-external.html")
    watch("public/assets/stylesheets/slides.css")
  end

  guard 'sass', :input => 'slides/assets/stylesheets',
    :output => 'public/assets/stylesheets'
end

group :build do
  guard :shell do
    # If any of these change run the script to build slides/slides.html
    watch('public/assets/stylesheets/slides.css')          {
      puts `./scripts/markdown_to_slides.sh`
    }
    watch('public/assets/stylesheets/slides-singlepage.css') {puts `./scripts/markdown_to_slides.sh`}
    watch(%r{public/assets/javascripts/.*.js})             {puts `./scripts/markdown_to_slides.sh`}
    watch('scripts/markdown_to_slides.sh')          {puts `./scripts/markdown_to_slides.sh`}
    watch('scripts/slides_to_handouts.rb') {puts `./scripts/markdown_to_slides.sh`}

    watch(%r{templates/.*})                                {puts `./scripts/markdown_to_slides.sh`}

    watch('slides/slides.md')                               {puts `./scripts/markdown_to_slides.sh`}

    watch(%r{public/assets/images/*\.(jpg|png)})           {puts `./scripts/markdown_to_slides.sh`}

    # watch('slides/slides-temp-nonselfcontained.html') {puts `./scripts/slides_to_handouts.rb`}

    # watch('slides/slides.html') {`cp slides/slides.html ../prelim_inventory/source/presentations/DIRECTORY_OF_PRESENTATION/slides.html; echo "Moved presentation to blog!"`}
  end
end
