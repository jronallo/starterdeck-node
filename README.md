# Starterdeck Node Edition

Write your slides in markdown in a single file and automatically convert with Pandoc to the following derivatives:

1. HTML slides using DZSlides (self-contained)
2. Single page HTML including all visible slide content as well as speaker notes and audience handout notes
3. Audience handout

When the node server is running the HTML slides and audience handout are synced via WebSockets.

When guard is running the derivatives are automatically built when something changes. Browser pages are also reloaded using livereload.

## Ruby: Watch and Build the Slides

```
bundle
bundle exec guard
```

## Editing the Slides

The only file you must edit is `slides/slides.md`. Take a look at that file for how to include speaker notes and audience handout notes.


## Node: WebSocket Syncing

Optionally the slides and audience handout page can be synced.

```
nodemon app.js
```

Visit <http://localhost:3003/theindexpage.html>


## TODO

- Deploy barebones version to heroku
- Link to original starterdeck and presentation this code was abstracted from
- Improve readme based on original starterdeck readme
- Write script to keep DZSlides template and slides/shells/onstage.html updated

