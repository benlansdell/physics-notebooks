---
layout: post
title: "Asking Alexa what planes are overhead"
author: "Ben Lansdell"
categories: posts
tags: [alexa]
published: true
image: atc.png
---

# The goal

Having just moved to Memphis, I'm only 3 miles from the busiest (cargo) airport in the world ([yes really](https://en.wikipedia.org/wiki/List_of_busiest_airports_by_cargo_traffic)). Basically, this means a lot of Fedex planes are flying directly overhead. I was curious to know what aircraft they were specifically, which led me down this flight tracking rabbit hole. Now here I am with an Alexa skill that allows me to ask my Echo what planes are flying nearby, using data from my own ADS-B receiver. 

Here I'll describe the process to set the whole thing up. Note that this is a solution if you specifically want to use your own flight tracking data. If you don't care about that, you can just install an already-made Alexa skill that just queries the OpenSky network or the ADSBExchange for nearby flight data. By using your own data you guarantee coverage in your area -- ADSBExchage may not have many data feeders in your region. 

# Outline

The basic steps are as follows:
1. Obtain the hardware you'll need: ADS-B receiver, filter, antenna, etc
2. Setup a computer to run dump1090 on. Commonly, this is a raspberry pi, running some flight tracking software. PiAware makes this very easy. 
3. On the raspberry pi, setup a Flask-Ask server to query dump1090's aircraft.json when your echo asks
4. Expose this server to the internet through ngrok. Could also use pagekite. 
5. Setup an Alexa skill -- just in developer mode -- that uses the Flask-ask server as an endpoint

More detail on each is below. Although I should note that this isn't intended as a full tutorial on setting up Raspberry Pis, Alexa Skills or Flask-Ask. This is just how you can reproduce this skill, and does assume some familiarity with the above, particularly if you have to tweak the recipe provided for your own situation. 

# Hardware

My setup is the following:

* A USB [FlightStick](https://amzn.to/3A2fKJo)
* A 1090MHz [Filter](https://amzn.to/3fqr0pH)
* A [Small indoor antenna](https://amzn.to/3FAlGup)
* [Raspberry pi zero](https://amzn.to/3frS7Ay)

But any variant on the above should work well. The filter is optional, but can help in urban areas reduce noise from other radio sources. The better your antenna setup the longer your tracking range is of course. Mounting an antenna outdoors should be significantly better than my indoor setup. 

# Basic flight tracking

* Setup the raspberry pi zero with the [piaware image](https://flightaware.com/adsb/piaware/build). Flightaware makes this very easy to setup, follow the instructions linked to here. Basically, you download the piaware image and place it on your pi's SD card. You can set your Wifi settings in the file `piaware-config.txt`. 
* It's a much nicer user experience to enable ssh access to your pi. That can be acheived simply by placing an empty file named `ssh` in the root directory of the /boot partition of the SD card.  
* Place the antenna near a window/outside, wait for the pi to boot and check its IP in your router's admin panel. 
* Point a broswer to that IP. PiAware will ask you to associate your dump1090 stream with your flightware account. 
* Now you're ready to track flights!
* Head to [https://flightaware.com/adsb/stats](https://flightaware.com/adsb/stats) to see your stats, and [your local ip]/skyaware, to see current flights nearby. 

# Flask-ask setup

Great, now you're tracking flights. You can head to `http://[Pi's IP]/skyaware/data/aircraft.json` to see a list of planes currently being tracked. Basically, we're going to run a Flask-ask server to parse this json file whenever a request comes from your Echo/Alexa skill. The steps for that are, on the pi:

Step 0 is setup the dev environment on the pi. Install git, vim, and whatever else you need. 

1. Clone the repo: `git clone https://github.com/benlansdell/raspberry-fly.git`
2. Install some packages:
```
sudo apt install python3-lxml nodejs npm mongodb
```
It's better to install `lxml` through `apt` since the compilation through `pip` could crash the pi. 
3. Install required python packages
```
pip install -r requirements.txt
```
4. Once all the requirements are installed, you can setup a Mongo database with:
```
python load_db.py
```
This will load a database with info about planes that we can query based on the registration number. The pi is pretty limited for both RAM and CPU, of course, so you may want to also build an index for the collection we'll be querying to make the queries faster. In the mongo CLI (`mongo`)
```
use AircraftData
db.Registration.createIndex({'icao':1})
```
5. Now we're ready to run the server. You could set this to run on startup. I just make a screen session and do it manually
```
python main.py
```

# Expose the server to the internet

The Flask-ask server is now running on port 5000. We want to expose this port to the internet so Alexa can access it. It seems frustrating having two local pieces of hardware communicate via Amazon's servers externally. Direct Echo -> device communcation may be possible in some instances, but getting it to talk directly to the pi would be some sort of hack (e.g. getting the Echo to think it was communicating with a smart bulb.). So this is the setup we'll use, until some other proper solution becomes available. 

So:
1. Install ngrok via apt
```
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null &&
              echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list &&
              sudo apt update && sudo apt install ngrok
```
2. Make an account at [ngrok](https://ngrok.com/) to allow for longer sessions. 
3. Start the tunnel
```
ngrok http 5000
```

Now we have a URL we can point Alexa to in order to access our flight data. A more robust solution may be to use pagekite. 

# Setup the Alexa skill

All that's left is to setup the Alexa skill to query our server. Head over to the Alexa skills developer console ([https://developer.amazon.com/alexa/console/ask](https://developer.amazon.com/alexa/console/ask)). You'll have to register as an Amazon developer if you haven't done so already. Then:

1. Create a new skill, the name will be the skill word. E.g. `Alexa ask [skill name] to ...`, so choose something that sounds natural. I just made mine Raspberry pi. Select the 'custom' template and choose to provision your own resources. Choose 'start from scratch' if it gives you a choice of template to use.
2. There are two things to setup: the endpoint and the intents. For the endpoint, go to 'Slot Types' -> Endpoint. Choose HTTPS, and input the https address output from ngrok into the default region field. Choose the type 'My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority. 
3. For the intent: Go to 'Interaction Model' -> 'JSON Editor'. Paste or upload the schema.json contents into the editor. This file contains the set of phrases used to request flight information from Flask-ask.

Save the model, build the model. Now it's ready to test. You can test it in the console, which can be helpful for debugging. It will show what was sent and received from the endpoint. ngrok and the flask-ask server should also output something for each request, so you can see where something has gone wrong pretty easily. 

Finally, if your local Echo is registered with the same Amazon account you should be able to see the skill you've just built in the list of skills, under the dev section. If it shows up in this list, you should be set to ask your Echo what planes are nearby. 

Something like:
```
Alexa ask raspberry pi what plane is closest.
```
And you should get a response!

# Summary and follow-up items

So there we have it. It's actually not that hard to get an Alexa skill to interact with your home devices. As I mentioned, a couple of obvious improvements are to get the server and tunnel running when the pi boots, that way you should be able to lose power etc and the system will restart itself. And using pagekite should allow for a more permanent forwarding URL. With ngrok, you'll get a different URL each time you start the process, and so you'll have to update your Alexa skill settings each time accordingly, which is a bit annoying.

There's a lot you could add to the model once the basics are working. You could make it possible to ask for more information about the flights overhead, like where they are heading, came from, etc. 
