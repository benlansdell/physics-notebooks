---
layout: post
title: "The arrow of time and entropy"
author: "Ben Lansdell"
categories: posts
tags: [entropy]
published: false
image: billiardballs.webp
---

The arrow of time refers to the fact that some physical processes have a temporal directionality.* We are familiar with many such processes: milk does not spontaneously unmix from the coffee we pour it into, eggs do not spontaneously reassemble themselves once broken, and shuffling a pack of cards is _very_ unlikely to return it to a sorted configuration. These are processes for which we can tell, if watching a video of the process, if it is being played forwards or backwards. What underlies this directionality? In all of the examples given, there is a sense in which entropy increases. So it's reasonable to think that the arrow of time may have something to do with entropy. 

(* There are other arrows of time, which are also interesting, so to be precise this article is just about the thermodynamic arrow of time.)

Further, the arrow of time cannot come from the fundamental laws of physics, as these are time reversible. By time reversible, we mean that if we make the substitution $$t' = -t$$, then the form of the dynamical equations comes out exactly the same. This is true for both classical and quantum systems. Here we consider classical systems here for simplicity. In a classical mechanics system, reversing time does nothing more than reverse the velocities of the objects under consideration; the dynamics remain the same. As such, if we were to examine a physical system where we are tracking the position of every relevant object, and where energy is conserved -- consider billiard balls on a table with elastic collisions that do not lose kinetic energy when they bounce, or roll -- we could not tell if it was being played forwards or backwards. 

So, if it's not to do with laws of fundamental physics, is the arrow of time _just_ the fact that systems move to a state of increased entropy? Could increasing entropy be used to _define_ which direction is future and which is past? Well, it's a little more complicated than that. The goal of this article is to answer this latter question. 

First, being in a global state of thermodynamic equilibrium -- a state of maximum entropy -- we don't expect there to be an arrow of time. In such a state there would be no eggs to break, and no unmixed milk to pour into coffee. Instead, the scenario we need to consider this question for is the one we find ourselves in now (in a cosmological sense of now): in a state that is not at maximum entropy, a non-equilibrium state, a state of _relatively_ low entropy. So, to rephrase the question we want to answer: in a relatively low entropy state, does entropy consistently increase in one direction in time -- the direction we would call the future? 

The answer is that, by itself, finding ourselves in a state of relatively low entropy is in fact not enough to pick out a special direction in time that is 'forwards' (the direction in which entropy increases). The problem is that, if all we know is that we are in a macrostate of relatively low entropy, then the chances are actually much greater that we are in a microstate for which that low-entropy macrostate state is a 'local minimum', that playing out the dynamics _in either direction_ would result in an increase in entropy, than are the chances we are in a microstate that moves from a state of _lower_ entropy. In such a local minimum, playing out the dynamics in either direction tends to lead to increased entropy, and we don't have a useful thermodynamic arrow of time. Said a slightly different way: if it were the case that playing the dynamics out in one direction had a higher entropy and the other had lower entropy, then we could call one future and the other past. But in general a low entropy state is not enough conclude the existence of a _lower_ entropy state that would allow for the definition of an arrow of time based solely on entropy. 

As a result of this consideration, an additional hypothesis about the state we find ourselves in is needed. A commonly invoked hypothesis is that there does exist a very low entropy state in the distant past. Essentially this is a boundary condition, an assumption about the entropy at the beginning of the universe. This was dubbed the _past hypothesis_ by philosopher/physicist David Albert. By assuming the past hypothesis then it _is_ the case that we can assume the existence of a _lower_ entropy state than the one we find ourselves in now, and therefore a way to relate the arrow of time to increasing entropy. 

## An example

We'll demonstate the idea with some bouncing balls. Below is a simple simulation of particles bouncing around in an arena (their size is irrelevant here). They do not interact with one another, for simplicity. This is the same assumption made for an ideal gas. We'll assume their collisions with the walls are fully elastic -- they just bounce directly off the wall with the same speed, and opposite direction. How does the entropy of the system evolve with time here? 

In this case we'll use a simple model for entropy. Our macrostate will just be defined as the very coarse grained positions of the particles -- how many particles are in the left half of the box? We'll define our entropy to be logarithm of the number of microstates possible for a given macrostate. This is written as
$$
\begin{equation}
S = k \ln (\Omega(X)),
\end{equation}
$$
where $$\Omega$$ is known as the multiplicity of the macrostate, given a state $$X$$. $$k$$ is Boltzman's constant, on the order of $$10^{-23}$$, though here we'll just treat $$k$$ as equal to 1. 

<iframe width="100%" height="605" frameborder="0"
  src="https://observablehq.com/embed/@benlansdell/entropy-and-the-arrow-of-time?cells=eh%2Ccanvas%2Cviewof+reset_widget_local"></iframe>

In this simulation, we can start in a state of zero entropy, low entropy, or in equilibrium (high entropy). Whether starting in zero entropy or in low entropy, playing the dynamics forward leads inextricably towards equilibrium -- roughly half the balls in the left and half in the right. You can run the dynamics forward for some time, until a balanced state is reached, and then reverse the dynamics to reveal a highly improbable set of trajectories -- all the balls converging on the left hand side. If you started the system at a state of equilibrium, this state would be exeedingly improbable -- occurring with a probably of something on the order of $$2^{-100}$$, meaning you could run this simulation for as long as you wanted and never observe it happen. And indeed it does _look_ highly improbable, it has the appearance of running backwards, even though there is nothing in the dynamical equations that has changed -- all we've done is reverse the velocities. 

The key point for the above discussion is that, when starting the system in a state of low entropy, you can see that playing the dynamics either forwards or backwards results in an increase in entropy. There is no direction in which entropy drops below what it started at. Thus there is really no time asymmetry here. The only way to get time asymmetry is to put it in at the very beginning. 
