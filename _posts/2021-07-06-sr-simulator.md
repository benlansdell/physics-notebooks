---
layout: post
title: "A special relativity simulator"
author: "Ben Lansdell"
categories: posts
tags: [special-relativity]
image: stars.png
---

Here we imagine we are in control of a powerful spaceship, navigating flat spacetime (i.e. away from any massive objects which could curve spacetime). We can provide thrust in only one spatial dimension, either forwards or backwards. 

The force we can apply, at a time measured on the ship $$\tau$$, accelerates the ship accordingly. What does our navigation look like from an outside observer? Let's call this outside reference frame **R**.

Special relativity dictates that when the relative velocity of our ship approaches the speed of light, the kinematics of our flight, as observed by an outside observer, deviate those given by Newtonian mechanics. This post lets us explore how the kinematics do play out in special relativity. 

Einstein's theories of relativity generally require spelling out the setup more explicitly than in a Galilean setting -- we have to explicitly say how a concept is to be operationalized for it to be fair game. To that end, let's elaborate a bit more before diving into the simulation. 

This will assume some knowledge of special relativity. 

### The setup

First, throughout we'll assume units in which the speed of light is 1, so there will be no $$c$$s anywhere thoughout this post. They could always be put back in any expression in whatever way makes the units work out.

Second, from our [earlier post](https://benlansdell.github.io/expositions/posts/minkowsky.html), we recall that moving clocks run slowly. So, we'll denote time measured by the outside observer as $$t$$. In frame **R**, $$\tau$$ runs slow compared to $$t$$ for high relative velocities. 

Now, how should we think about acceleration in moving frames? Dealing with measurements made in an accelerating frame is most satisfactorily studied with the general theory of relavity. But even absent this more general theory we can make sense of this question. The idea is to define all kinematic quantities, including acceleration, as 4-dimensional objects that are parameterized by the spaceship's clock, $$\tau$$. By doing so these quantities possess certain invariances to undergoing a Lorentz transformation -- their properties are independent of our way of observing, or parameterizing, them. (These derivations will be provided in a follow-up post.) This is useful here, and indispensible in more complicated cases.

The so-called 4-acceleration is the rate of change of the 4-velocity as a function of proper time, $$\tau$$:

\begin{aligned}
A = dU/d\tau = [a^0, a^1, a^2, a^3]
\end{aligned}


In our reduced dimension case, we only need consider 1 spatial component. We can show that $$A$$ is of the form: $$a^0 = a\gamma v$$, $$a^1 = a\gamma$$ and $$a^2 = a^3 = 0$$, for some parameter $$a$$. In fact, in Minkowsky space, with the metric signature (-1,1,1,1), we have $$A\cdot A = a^2$$. Further, in an inertial frame that is at some moment $$t$$ moving along with the ship at exactly its velocity, $$v(t)$$, we see that $$a^0 = 0$$ and $$a^1 = a$$. This means that in the inertial frame that is momentarily moving along with the ship, there are no relativistic effects and the ship has acceleration $$a$$ -- thus $$a$$ can be thought of as the acceleration _as experienced by those on the ship, and what we have control over by adjusting the thrusters_. 

### The kinematic equations

From an outside observer, it is quite straightforward to derive the following relations:

\begin{aligned}
dx/d\tau = \sinh\left(\int_0^{\tau(t)} a(s)\,ds\right)\\
dt/d\tau = \cosh\left(\int_0^{\tau(t)} a(s)\,ds\right)
\end{aligned}


And thus we have

\begin{aligned}
v(t) = dx/dt = \tanh\left(\int_0^{\tau(t)} a(s)\,ds\right)
\end{aligned}


The quantity $$\phi = \int_0^\tau a(s)\,ds$$ is known as the rapidity. Note that it has the form simply of the integrated 'local' acceleration -- it is the velocity occupants on the ship would be moving at if relativistic effects were absent.

This equation for velocity as a function of rapidity can be integrated by time to give the ship's position in frame **R**.

### The simulation

The simulation below computes rapidity as a function of force applied to the ship, from which it can compute $$v$$ and thus $$x$$. It also tracks the ship's mass, proper time, momentum and Lorentz factor, all assuming the ship has unit mass. You can change the force with the slider below.

First we plot things for an outside observer, frame **R**.

<div id="observablehq-viewof-options-8839b668"></div>
<div id="observablehq-viewof-reset_widget-8839b668"></div>
<div id="observablehq-rest_frame-8839b668"></div>
<div id="observablehq-speedControl-8839b668"></div>
<div id="observablehq-Force-8839b668"></div>
<div id="observablehq-stats-8839b668"></div>

<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@benlansdell/a-special-relativity-simulator.js?v=3";
new Runtime().module(define, name => {
  if (name === "viewof options") return new Inspector(document.querySelector("#observablehq-viewof-options-8839b668"));
  if (name === "viewof reset_widget") return new Inspector(document.querySelector("#observablehq-viewof-reset_widget-8839b668"));
  if (name === "rest_frame") return new Inspector(document.querySelector("#observablehq-rest_frame-8839b668"));
  if (name === "speedControl") return new Inspector(document.querySelector("#observablehq-speedControl-8839b668"));
  if (name === "Force") return new Inspector(document.querySelector("#observablehq-Force-8839b668"));
  if (name === "stats") return new Inspector(document.querySelector("#observablehq-stats-8839b668"));
  return ["plot_rest_frame","state","a","t","tau","p","x","rapidity","p_g","x_g","v_g","plot_moving_frame","v","moving_frame","m_x_func","m_t_func","gamma","mass","energy"].includes(name);
});
</script>

Denote by **R'**(t) the inertial frame that, at time $$t$$, is moving with speed $$v(t)$$ relative to **R**, with the origin shifted to be the location of the ship. We can then plot the worldline from **R'**(t). 

<div id="observablehq-moving_frame-39a30556"></div>

<script type="module">
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "https://api.observablehq.com/@benlansdell/a-special-relativity-simulator.js?v=3";
new Runtime().module(define, name => {
  if (name === "moving_frame") return new Inspector(document.querySelector("#observablehq-moving_frame-39a30556"));
});
</script>

Some things to note:

* In frame **R'**(t), the acceleration vector points entirely in the $$x$$ axis and the velocity vector coincides with the time axis $$t'$$ -- this makes sense since in this frame it has, at this instance, zero velocity. It's clear in this frame that the acceleration vector is always perpendicular to the velocity vector -- acceleration is the curvature of the worldline.

* The velocity and acceleration vectors in the rest frame **R** are simply those same vectors in **R'**, Lorentz transformed accordingly -- their Lorentz invariance means that they have the same magnitude and stay orthogonal to one another -- acceleration is still the curvature of the worldline. 

* The worldline drawn in **R'**(t) is, in my opinion at least, not the most intuitive thing to interpret, as the reference frame always changes velocity as the ship does. You can see, however, that once no force is applied, the ship moves with constant velocity and the worldline drags straight behind the ship. More generally, in this frame the trajectory appears, basically, as the turning point of a parabola which is up or down depending on the sign of the acceleration.

* If you turn on the Show Galilean Motion option, it shows the trajectory a ship will follow in **R** under normal, Newtonian mechanics. A key difference you can notice is that it can move faster than the speed of light, as evidenced by being able to move outside of the origin's lightcone. 

* A final note is an admission of some subtley that comes with the way this simulation was described and setup. Our simulation clock counts ticks of rest time $$t$$, and yet we're imagining that we're on board the ship, changing its thrusters. The relative rate at which proper time, $$\tau$$, ticks over can be, depending on $$\gamma$$, significantly slower. The temporal resolution at which we're able to issue commands to the ship and respond to changes in its motion thus _increases_ as time dilation increases. This isn't so realistic. Is it better to instead run the simulation with a fixed proper time stepsize? The issue with that is that I think its easier to get a sense for the motion from a single inertial frame **R**, which dictates using an external clock. A fixed step size in $$\tau$$ could become arbitrarily large in $$t$$, so we would lose numerical precision in our external view of things.

Hopefully this simulation gives a bit more intuition about how kinematics work in special relativity -- just remember: constant velocity trajectories are hyperbola. For our next post, we will incorporate gravity into the picture with Einstein's general theory of relativity.
