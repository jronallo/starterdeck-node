# Starterdeck Node Edition

Write your slides in markdown in a single file and automatically convert with Pandoc to the following derivatives:

1. HTML slides using DZSlides (self-contained)
2. Single page HTML including all visible slide content as well as speaker notes and audience handout notes
3. Audience handout

When the node server is running the HTML slides and audience handout are synced via WebSockets.

When guard is running the derivatives are automatically built when something changes. Browser pages are also reloaded using livereload.

The slides are self-contained, meaning that all images, CSS, JavaScript, videos, and other external assets are included in the markup as data: URIs.

## About

You can read more about this approach to creating slideshows here: <http://jronallo.github.io/blog/html-and-pdf-slideshows-with-dzslides/>

Based on the [original starterdeck](https://github.com/jronallo/starterdeck) and a [presentation for Code4Lib 2014 on WebSockets](http://ronallo.com/presentations/code4lib-2014-websockets/).


## Requirements

- Pandoc
- Ruby
- Node.js

## Getting started

You could fork the repository. But often I have a slide deck which is part of a larger repository, so I would rather just do an "export" into a new directory. So just clone this repository and then from within the cloned repository do something like this:

```
$ git archive master | tar -x -C ~/project/new_presentation
```

## Ruby: Watch and Build the Slides

```
bundle
bundle exec guard
```

## Editing the Slides

The only file you must edit is `slides/slides.md`. Take a look at that file for how to include speaker notes and audience handout notes.

## Node: WebSocket Syncing

Optionally the slides and audience handout page can be synced.

TODO: Give directions on how to install node packages.

```
nodemon app.js
```

Visit <http://localhost:3003/theindexpage.html>

## Using the Latest DZSlides Template

```
wget --directory-prefix ~/.pandoc/dzslides https://raw.githubusercontent.com/paulrouget/dzslides/master/template.html
```

See the addition to the first comment here for more information on this: <https://github.com/paulrouget/dzslides/issues/52>

## Customization

Edit assets/stylesheets/_custom.css.scss using the SCSS syntax.

Edit assets/javascripts/custom.js to add custom JavaScript.

## Sass

This project uses Sass and provides some mixins for some common slide styles. You can see them in assets/stylesheets/_starterdeck.css.scss

## Presenter Mode

<http://localhost:3003/onstage#/slides>

## Speaker notes

Included in assets/starterdeck.js is some JavaScript to toggle notes off and on using the "n" key.

## Exporting a PDF

`scripts/dzslides2pdf.rb http://localhost:3003 slides`

## TODO

- Deploy barebones version to heroku
- Instructions for deploying to Heroku
- Write script to keep DZSlides template and slides/shells/onstage.html updated
- Include an example chat or audience questions slide

## License

See MIT-LICENSE

## Author

This is made out of many tools others have created, but this arrangement of the tools was done by Jason Ronallo. If you use starterdeck-node it would be nice, though not required, to give a link back to the original repository or <http://ronallo.com> within your slide deck.
