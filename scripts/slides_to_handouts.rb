#! /usr/bin/env ruby

# create_audience_handout.rb path/to/slides-with-audience-notes.html

require 'nokogiri'
require 'pry'

slides_path = ARGV[0]
doc = Nokogiri::HTML(File.open(slides_path))

File.open('slides/handouts.md', 'w') do |fh|
  doc.xpath('//section').each do |section|
    id = section.attr(:id)
    h1 = section.xpath('h1').text()
    handout = section.xpath('div[@class="handout"]')
    handout_content = handout.children.to_html
    if handout.length > 0
      fh.puts "# #{h1} {##{id}}\n"
      fh.puts handout_content
      fh.puts "\n"
    end
  end
end