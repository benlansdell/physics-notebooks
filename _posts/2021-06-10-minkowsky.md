---
layout: post
title: "Minkowsky space"
author: "Ben Lansdell"
categories: posts
tags: [special-relativity]
image: stars.png
---

Here is an exploration of Minkowsky space -- the space-time prescribed by the postulates of special relativity -- in 1 space dimension (and 1 time dimension).

A theory of relativity tells us how measurements of space (e.g. location, length) and time (e.g. duration) taken by two observers are related to one another. Objects are always in motion relative to one another, and such measurements are of course fundamental to any theory of mechanics, thus such theories are foundational to physics.

The fundamental object in such a theory is an _event_, which is simply a point in space and time. How do two observers measure the same event?

### Galilean space-time

Before describing the space-time prescribed by special relativity, we can describe what is perhaps the naive way of relating events measured by two observers -- that of pre-Einsteinian, Galilean space-time.

Shown below are the coordinate frames for two observers, one moving relative to one other. The stationary observer has the standard Cartesian grid (red), while the moving observer has a grid that is a shear mapping of the Cartesian grid (blue; though they are overlapped in the default image to make purple, change the relavtive velocity to see the two axes), the amount of shear determined by the relative velocity of the frames. 

The idea is to think of events, being points in space and time, as being located on this chart somewhere. By overlapping the two observers' coordinate frames we can say how each observer would measure a given event. Note that the overlapping coordinates here are setup so that both have the same origin. 

The shear transformation shown here is in fact the Galilean transformation. Supposing $$x$$ is the spatial location of an event in the stationary frame, and $$x$$ is the spatial location of the event in the moving frame. Similarly for the times $$t$$ and $$t'$$. Then, given a relative frame velocity $$v$$, they are related by
$$
\begin{aligned}
x' &= x - vt,\\
t' &= t.
\end{aligned}
$$
You can see the effect of changing the velocity on the axes below.

<div id="observablehq-viewof-v_g-d6e7403f"></div>
<div id="observablehq-viewof-lightcone_g-d6e7403f"></div>
<div id="observablehq-pg-d6e7403f"></div>
<div id="observablehq-stats-d6e7403f"></div>

<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@benlansdell/minkowsky-space.js?v=3";
new Runtime().module(define, name => {
  if (name === "viewof v_g") return new Inspector(document.querySelector("#observablehq-viewof-v_g-d6e7403f"));
  if (name === "viewof lightcone_g") return new Inspector(document.querySelector("#observablehq-viewof-lightcone_g-d6e7403f"));
  if (name === "pg") return new Inspector(document.querySelector("#observablehq-pg-d6e7403f"));
  if (name === "stats") return new Inspector(document.querySelector("#observablehq-stats-d6e7403f"));
  return ["g_x_func","g_x_inv","plot_gallileo","event_xp_g","event_x_g"].includes(name);
});
</script>

* Single clicking on the plot above places an event on the axes, considered fixed in the stationary frame, with corresponding coordinates in each frame shown below. Note that the moving observer measures this event differently if you change the relative velocity of the two frames with the slider above. It also draws a linear trajectory from the origin to this event -- we can imagine some particle travelling along this trajectory. We know its start and end points, and so can compute its velocity in both coordinate frames, as shown.

* Double clicking on the plot above also places an event on the axes. This event is considered to be fixed in the moving frame, however, and so now if you change the relative velocity of the frames the event will (in our 'non-moving' frame) be shifted along with it.  

### From Galileo to Minkowsky

Galilean space-time has a curious feature, in particular when it comes to measuring the speed of light. Einstein noted that, in the scenario above, in which both observers are in so-called inertial references frames, moving relative to one another, there is no privileged frame in which an observer can rightfully claim to 'really be the one at rest', and that it is the others that are 'really moving'. This means that both observers, in their own frames of reference, cannot do any experiments that can tell them it is they who are stationary, and not the other observer. **The laws of physics are the same for all inertial observers**. This is Einstein's first postulate. His second postulate follows naturally from this line of thinking: **the speed of light is the same for all inertial observers**, regardless of the velocity of the object that emitted the light. Some reflection suggests that the second postulate is incompatible with the Galilean picture above. 

This is easy to see in the above Galilean axes. Turn on the light cone on the axes. This draws the trajectory a particle traveling from the origin at the speed of light, relative to the stationary observer, would take in the diagram (we have normalized units here so that the speed of light $$c$$ is 1, and hence this line has slope $$\pm 1$$). Select an event that sits on this light cone somewhere. By sitting on the light cone it has speed $$c$$ according to the stationary frame. But observe that this is not the case as measured by the moving observer. Indeed, as the relative velocity of the two frames is changed, the velocity of the packet of light, as measured by the other observer, changes.

### Minkowsky space-time

Minkowsky space-time is what we get when we impose Einstein's second postulate on a theory of relativity. The result is not a separate *Euclidean* space with a time dimension added time but, in a certain sense, a *hyperbolic* space-time in which space and time become interrelated. It has strange consequences for our notions of space, time, energy and mass.

<div id="observablehq-viewof-v_m-8e80fb62"></div>
<div id="observablehq-viewof-lightcone_m-8e80fb62"></div>
<div id="observablehq-pm-8e80fb62"></div>

<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@benlansdell/minkowsky-space.js?v=3";
new Runtime().module(define, name => {
  if (name === "viewof v_m") return new Inspector(document.querySelector("#observablehq-viewof-v_m-8e80fb62"));
  if (name === "viewof lightcone_m") return new Inspector(document.querySelector("#observablehq-viewof-lightcone_m-8e80fb62"));
  if (name === "pm") return new Inspector(document.querySelector("#observablehq-pm-8e80fb62"));
  return ["plot_minkowsky","gamma","m_x_func","m_t_func","m_x_inv","m_t_inv","event_xp_m","event_x_m","event_t_m"].includes(name);
});
</script>

Above is a representation of Minkowsky space, that is the space-time in which inertial frames of reference are related by the following transformation, known as the Lorentz transformation: 
$$
\begin{aligned}
x' &= \gamma(x - vt),\\
t' &= \gamma(t - vx/c^2),
\end{aligned}
$$
where $$\gamma = 1/\sqrt{1-v^2/c^2}$$.

If you play around with specifing events on these coordinates and with different relative frame velocities, you'll notice some interesting things.

* First, as designed, the two frames share the same light cone. You'll notice an event placed on the light cone stays on the light cone, regardless of the relative velocity of the two reference frames. In other words, the two observers always agree on the speed of light. 

* Second, events that are above the light-cone stay above the light-cone, regardless of relative frame velocities. Similarly for events that are below the light cones -- they stay below the light cone. There is a strong division of Minkowsky space-time into regions which can be reached by slower-than-light travel from the origin, and those that cannot. Events that sit in this latter space will *never* be affected by an event at the origin, and nor will any of these events affect anything happening at the origin.

* Third, the two frames of reference may no longer agree on the time that an event took place. Two events that may appear simultaneous (e.g. lying on the same 'horizontal' line) to one observer may not appear as simultaneous to the other. Special relativity abandons the notion of absolute time -- the notion that time proceeds equally for all throughout the whole universe, and that there is a well-defined way in which two spatially separated events can be judged to have occurred simultaneously that all observers would agree on. 

* Fourth, in particular, a moving clock will appear, from the stationary observer, to run *slowly*. Set the relative frame velocity to zero, and place an event in the moving frame (double click on the axes) at (x' = 0, t' = 1). I.e. an event at the moving frame's spatial origin, *one unit of time after time 0*. When there is no relative velocity, of course the two frames measure the time of this event as the same. As the relative velocity is increased, however, 'one unit of time later' for the moving observer becomes *more* than one unit of time later for the stationary observer. More time will appear to have passed for the stationary observer than for the moving one. Weird.

This is just to highlight some of the most significant and interesting features of this model of space-time. There is much still to explore. 
