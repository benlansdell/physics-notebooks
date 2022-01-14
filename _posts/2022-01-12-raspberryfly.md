---
layout: post
title: "Asking Alexa what planes are overhead"
author: "Ben Lansdell"
categories: posts
tags: [alexa]
published: false
image: atc.png
---

# The goal

Having just moved to Memphis, I'm only 3 miles from the busiest (cargo) airport in the world ([really](https://en.wikipedia.org/wiki/List_of_busiest_airports_by_cargo_traffic)). Basically, this means a lot of Fedex planes are flying directly overhead. I was curious to know what aircraft they were specifically, which led me down this flight tracking rabbit hole. Now here I am with an Alexa skill that allows me to ask my Echo what planes are flying nearby, using data from my own ADS-B receiver. 

Here I'll describe the process to set the whole thing up.

# Outline

The basic steps are as follows:
1. Obtain the hardware you'll need: ADS-B receiver, filter, antenna, 
2. Setup a computer to run dump1090 on. Commonly, this is a raspberry pi, running some flight tracking software. PiAware makes this very easy. 
3. On the raspberry pi, setup a Flask-Ask server to query dump1090's aircraft.json when your echo asks
4. Expose this server to the internet through ngrok. Could also use pagekite. 
5. Setup an Alexa skill -- just in developer mode -- that uses the Flask-ask server as an endpoint

# Hardware

asdf

# Basic flight tracking

# Flask-Ask setup

#
