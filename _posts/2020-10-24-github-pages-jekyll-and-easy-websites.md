---
layout: post
title: "GitHub Pages, Jekyll, and Easy Websites"
date: 2020-10-24
excerpt: "A brief summary on the way this site was made."
image: "/images/GitHubPages.jpg"
caption: "GitHub Pages"
credit: "https://pages.github.com/"
alt: "Screenshot from the GitHub Pages webpage. A computer and phone screen with the same site in different styles to fit each screensize. The text reads &#8220;GitHub Pages. Websites for you and your projects. Hosted directly from your GitHub repository. Just edit, push and your changes are live. Jekyll - Transform your plain text into static websites and blogs.&#8221;."
draft: false
---

## This Site
This site was created for free by me, with the use of [GitHub Pages](https://pages.github.com/). GitHub Pages is GitHub's hosting platform, allowing you to create sites for yourself or for an individual repository. It's really easy to set up, and you can find out how [here](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages). Pages allows you to choose from a few pre-set themes that give your site a little more flair, or you could go and find a custom one that suits you, or go ahead and make one yourself! The custom theme that I'm using is called Massively, and you can find out more about it [here](https://github.com/jekyllup/jekyll-theme-massively). All of the themes use [Jekyll](https://jekyllrb.com/) - a static site generator. You can use it to style your site using different layouts and pages, which you'd create in languages like HTML, CSS, & JavaScript, and add content with mark-up languages.

### Content
Content for each page is inside of a file containing a mark-up language. For example, I'm using markdown (.md) files. In each file, you must specify the attributes that will be used in the layout file. For example, in the [previous post](https://cameron-leech-thomson.github.io/blog/welcome-to-my-site/) I put up, the attributes look like this:
```markdown
    ---
    layout: post
    title:  "Welcome to My Site!"
    date:   2020-10-21
    excerpt: "This is the first post on my shiny new portfolio site!"
    image: "/images/post1.jpg"
    caption: "Photo by Ilya Pavlov on Unsplash"
    credit: "https://unsplash.com/photos/OqtafYT5kTw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
    alt: "Computer monitor showing HTML code, with some sections of PHP & JavaScript."
    ---
```
The attributes here are accessed in a HTML file, and then used to fill the slots for various pieces of content. The main bulk of writing done in a post is done after the `---`.

### Layouts
Each layout is just a HTML file, that creates the setting for the content. However the actual content is not in the HTML, but a mark-up file. To get the content from the mark-up files, you'd access it like this:  
Say you're after the markdown attribute `title` in:
```markdown
    title: "Post Title"
```
Which you're trying to put in the main header for your page. You'd set the HTML up like this:
{% raw %}
```html
    <header>
        <h1 class = "title">{{page.title}}</h1>
    </header>
```
{% endraw %}
In this instance, the call{% raw %} `{{page.title}}` {% endraw %}is where you retrieve the title of the page itself. You'd also preface any attribute you're after with `page.` then the name of the attribute. HTML takes in the string and runs it like you wrote it there in the first place. For example, if you wanted to embed a URL, you'd do it like this:
{% raw %}
```html
    <a href = "{{page.url}}">Click Here!</a>
```
{% endraw %}
Images references would work in exactly the same way too.

## Learn More
If you'd like to learn more about Jekyll, you can [click here](https://jekyllrb.com/) to be taken to the Jekyll website. If you'd like to learn more about GitHub pages, you can [click here](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages) to be taken to the Pages documentation. If you'd like to find out more about markdown - the language I use for the site's content, you can find out [here](https://www.markdownguide.org/). You can also find GitHub user [adam-p](https://github.com/adam-p)'s Markdown cheat sheet [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). I'd recommend having a play with it, even if you don't have a reason for a website. It's just good fun, and it's free!

Enjoy, and have a nice day!
