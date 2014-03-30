# Starterdeck Node Edition

Write your slides in markdown in a single file and automatically convert with Pandoc to the following derivatives:

1. HTML slides using DZSlides (self-contained)
2. Single page HTML including all visible slide content as well as speaker notes and audience handout notes
3. Audience handout

When the node server is running the HTML slides and audience handout are synced via WebSockets.

When guard is running the derivatives are automatically built when something changes. Browser pages are also reloaded using livereload.

## Node: WebSocket Syncing

```
nodemon app.js
```

Visit <http://localhost:3003/theindexpage.html>

## Ruby

```
bundle
bundle exec guard
```

## Editing the Slides

The only file you must edit is `slides/slides.md`. Take a look at that file for how to include speaker notes and audience handout notes.

## TODO

- Deploy barebones version to heroku
- Link to original starterdeck and presentation this code was abstracted from


