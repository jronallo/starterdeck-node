#! /usr/bin/env ruby

# dzslides2pdf.rb
# dzslides2pdf.rb http://localhost/presentation_root presentation.html

require 'capybara/dsl'
require 'capybara-webkit'
# require 'capybara/poltergeist'
require 'fileutils'
include Capybara::DSL

base_url = ARGV[0] || (puts "You must enter the base URL followed by the filename."; exit)
presentation_name = ARGV[1] || 'presentation.html'

# temporary file for screenshot
FileUtils.mkdir('./screenshots') unless File.exist?('./screenshots')

Capybara.configure do |config|
  config.run_server = false
  config.default_driver
  config.current_driver = :webkit # :poltergeist
  config.app = "fake app name"
  config.app_host = base_url
end

visit File.join("/", presentation_name) # visit the first page

# change the size of the window
if Capybara.current_driver == :webkit
  page.driver.resize_window(1024,768)
end

sleep 3 # Allow the page to render correctly
page.save_screenshot("./screenshots/screenshot_000.png", width: 1024, height: 768) # take screenshot of first page

# calculate the number of slides in the deck
slide_count = page.body.scan(%r{slide level1}).size
puts slide_count

(slide_count - 1).times do |time|
  slide_number = time + 1
  keypress_script = "Dz.forward();" # dzslides script for going to next slide
  page.execute_script(keypress_script) # run the script to transition to next slide
  sleep 3 # wait for the slide to fully transition
  # screenshot_and_save_page # take a screenshot
  page.save_screenshot("./screenshots/screenshot_#{slide_number.to_s.rjust(3,'0')}.png", width: 1024, height: 768)
  print "#{slide_number}. "
end

puts `convert screenshots/*png presentation.pdf`

FileUtils.rm_r('screenshots')