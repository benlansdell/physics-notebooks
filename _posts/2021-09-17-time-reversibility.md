---
layout: post
title: "The arrow of time and entropy"
author: "Ben Lansdell"
categories: posts
tags: [entropy]
published: true
image: billiardballs.webp
---

The arrow of time refers to the fact that some physical processes have a temporal directionality. We are familiar with many such processes: milk does not spontaneously unmix from the coffee we pour it into, eggs do not spontaneously reassemble themselves once broken, and shuffling a pack of cards is _very_ unlikely to return it to a sorted configuration. These are processes for which we can tell, if watching a video of the process, if it is being played forwards or backwards. What underlies this directionality? In all of the examples given, there is a sense in which entropy increases. So the arrow of time may have something to do with entropy. 

Further, the arrow of time cannot come from the fundamental laws of physics, as these are time reversible. By time reversible, we mean that if we make the substitution $$t' = -t$$, then the form of the dynamical equations comes out exactly the same. This is true for both classical and quantum systems. Here we consider classical systems here for simplicity. In a classical mechanics system, reversing time does nothing more than reverse the velocities of the objects under consideration; the dynamics remain the same. As such, if we were to examine a physical system where we are tracking the position of every relevant object, and where energy is conserved -- consider billiard balls on a table with elastic collisions that do not lose kinetic energy when they bounce, or roll -- we could not tell if it was being played forwards or backwards. 

So is the arrow of time _just_ the fact that systems move to a state of increased entropy? Could increasing entropy be used to _define_ which direction is future and which is past? Well, it's a little more complicated than that. The goal of this article is to answer this latter question. 

The scenario to consider is the one we find ourselves in now (in a cosmological sense of now) -- in a state that is not at maximum entropy, a non-equilibrium state, a state of _relatively_ low entropy. Being at equilibrium we don't expect there to be an arrow of time. So, to rephrase the question we want to answer: in a relatively low entropy state, does entropy consistently increase in one direction in time -- the direction we would call the future? 

The answer is that: by itself, finding ourselves in a state of relatively low entropy is in fact not enough to pick out a special direction in time that is 'forwards' (the direction in which entropy increases). The problem is that, if all we know is that we are in a macrostate of relatively low entropy, then the chances are actually much greater that we are in a microstate for which that low-entropy macrostate state is a 'local minimum', that playing out the dynamics _in either direction_ would result in an increase in entropy, than are the chances we are in a microstate that moves from a state of _lower_ entropy. In such a local minimum, playing out the dynamics in either direction tends to lead to increased entropy, and we don't have a useful thermodynamic arrow of time. Said a slightly different way: if it were the case that playing the dynamics out in one direction had a higher entropy and the other had lower entropy, then we could call one future and the other past. But in general a low entropy state is not enough conclude the existence of a _lower_ entropy state that would allow for the definition of an arrow of time based solely on entropy. 

As a result of this consideration, an additional hypothesis about the state we find ourselves in is needed. A commonly invoked hypothesis is that there does exist a very low entropy state in the distant past. Essentially this is a boundary condition, an assumption about the entropy at the beginning of the universe. This was dubbed the _past hypothesis_ by philosopher/physicist David Albert. By assuming the past hypothesis then it _is_ the case that we can assume the existence of a _lower_ entropy state than the one we find ourselves in now, and therefore a way to relate the arrow of time to increasing entropy. 

Here are some simple demonstrations of these ideas.

First, we'll demonstate the idea with some bouncing balls. Below is a simple simulation of particles bouncing around in an arena (their size is irrelevant here). They do not interact with one another, for simplicity. This is the same assumption made for an ideal gas. We'll assume their collisions with the walls are fully elastic -- they just bounce directly off the wall with the same speed, and opposite direction. How does the entropy of the system evolve with time here? 

In this case we'll use a simple model for entropy. Our macrostate will just be defined as the very coarse grained positions of the particles -- how many particles are in the left half of the box? We'll define our entropy to be logarithm of the number of microstates possible for a given macrostate. This is written as
$$
\[
S = k \ln (\Omega)
\]
$$
Where $$\Omega$$ is known as the multiplicity of the macrostate. $$k$$ is Boltzman's constant, on the order of $$10^{-23}$$. 


The idea here is to observe that:
* For a high entropy state, we can reverse the dynamics and things look exactly the same
* For a low entropy state, reversing the dynamics reveals a highly unlikely set of trajectories -- all the balls move to one corned of the arena

<iframe width="100%" height="605" frameborder="0"
  src="https://observablehq.com/embed/@benlansdell/entropy-and-the-arrow-of-time?cells=eh%2Ccanvas%2Cviewof+reset_widget_local"></iframe>

Second we'll demonstate the past hypothesis with a longer duration, one dimensional, simulation. 
* We will run the simulation with and without a past hypothesis
* We will notice that with the past hypothesis, until we reach a state of maximum entropy, the entropy values provide an ordering on time
* Running the simulation for the same duration without the past hypothesis there is no such ordering. A low entropy state is just as likely to be followed by a higher entropy state as it is likely to be preceeded by a high entropy state. 
