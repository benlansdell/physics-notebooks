---
layout: post
title: "The arrow of time and entropy"
author: "Ben Lansdell"
categories: posts
tags: [entropy]
image: billiardballs.webp
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
