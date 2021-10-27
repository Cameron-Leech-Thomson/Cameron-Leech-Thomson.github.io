---
layout: page
title: About Me
description: A little description about me and this site!
sitemap:
    priority: 0.7
    lastmod: 2017-11-02
    changefreq: weekly
birthDateRaw: 2001-02-22
---
## About Me

<!--  <span class="image left"><img src="{{ "/images/pic04.jpg" | absolute_url }}" alt=""/></span>  -->

{% assign currentYear = site.time | date: %F %}
{% assign birthDate = page.birthDateRaw | date: %F %}
{% assign age = currentYear | minus: birthDate %}

Hi! I'm Cameron, I'm a {{ age }} year old, 3rd year Computer Science student at The University of Sheffield. I've created this website as a portfolio to show the projects that I make, whether they're University work or just for my own amusement. This way I can have all my projects in one place for everyone to see! If you want to take a more in-depth look at my projects, the blog posts about them will come with a link to their GitHub repository. If you want to have a look over all of them, take a look at my GitHub page [here](https://github.com/Cameron-Leech-Thomson)!
Usually, I'll post when a new project is uploaded. However, if I find something particularly interesting while doing a project, that topic might get its own blog post. I hope you enjoy!

### What's this Site About?
I'll normally make a blog post every time I finish a new project, where I'll talk about the process of creating the project, as well as how the final result works. I'll try to keep it short!
In these posts, I'll talk about how I decided on each part of the process and why I think it's better than an alternative. If you'd like to tell me why I'm wrong, feel free to let me know below! As well as the project posts, I may post about specific parts of a project in more detail, for example, if I am particularly proud of a certain part of the code, or if it was a pain to get to work.

<div class="box">
  <p>
  The creation of this site was greatly assisted by my good friend <a href = "https://twitter.com/caseyh08">Casey Henderson</a>. Casey is a student of Computer Science at Sheffield Hallam University. If you'd like to check him out, you can find his GitHub <a href = "https://github.com/caseyhenderson">here</a>, and his personal website <a href = "https://caseyhenderson.github.io">here.</a> Many thanks to him!
  </p>
</div>

Feel free to follow me on my socials below (Twitter, LinkedIn, GitHub). My views do not represent those of anyone I have previously or currently worked with.
