---
layout: post
title: "The arrow of time and entropy"
author: "Ben Lansdell"
categories: posts
tags: [entropy]
image: billiardballs.webp
---

The arrow of time refers to the fact that some physical processes have a temporal directionality. We are familiar with many such processes: milk does not spontaneously unmix from the coffee we pour it into, eggs do not spontaneously reassemble themselves once broken, and shuffling a pack of cards is _very_ unlikely to return it to a sorted configuration. These are processes for which we can tell, if watching a video of the process, if it is being played forwards or backwards. What underlies this directionality? In all of the examples given, there is a sense in which entropy increases. So the arrow of time can come from something to do with entropy. 

Further, the arrow of time cannot come from the fundamental laws of physics, as these are time reversible. By time reversible, we mean that if we make the substitution $t' = -t$, then the form of the dynamical equations comes out exactly the same. This is true for both classical and quantum systems. Let's consider classical systems here for simplicity. In a classical mechanics system, reversing time does nothing more than reverse the velocities of the objects under consideration; the dynamics remain the same. As such, if we were to examine a physical system where we are tracking the position of every relevant object, and where energy is conserved -- consider billiard balls on a table with elastic collisions that do not lose kinetic energy when they bounce, or roll -- we could not tell if it was being played forwards or backwards. 

So is the arrow of time _just_ the fact that systems move to a state of increased entropy? Could increasing entropy be used to _define_ which direction is future and which is past? Well, it's a little more complicated than that. 

The scenario to consider is the one we find ourselves in now -- a state that is not at maximum entropy, a non-equilibrium state, a state of _relatively_ low engtropy. Being at equilibrium we don't expect there to be an arrow of time. 

The complication is that finding ourselves in a state of relatively low entropy is not enough to pick out a special direction in time that is 'forwards' -- the direction in which entropy increases. This is because if all we know is that we're in a state of low entropy, there are in fact many more microstates in which that low-entropy state is a 'local minimum', and that playing out the dynamics _in either_ direction would result in an increase in entropy, than there are microstates in which there is an adjacent state that has a _lower_ entropy. If it was the case that playing the dynamics out in one direction had a higher entropy and the other had lower entropy, then we could call one future and the other past. But in general a low entropy state is not enough conclude the existence of a _lower_ entropy state that allows for the definitin of an arrow of time based on entropy. 

As a result, an additional hypothesis is needed. A commonly invoked hypothesis is that there does exist a very low entropy state in the distant past. Essentially a boundary condition, an assumption about the entropy at the beginning of the universe. This was dubbed the past hypothesis by philosopher/physicist David Albert. By assuming the past hypothesis then it _is_ the case that we can assume the existence of a _lower_ entropy state than the one we find ourselves in now, and therefore a way to define the arrow of time. 

Here are some simple demonstrations of these ideas.

First, we'll demonstate the idea with some billiard balls. The idea here is to observe that:
* For a high entropy state, we can reverse the dynamics and things look exactly the same
* For a low entropy state, reversing the dynamics reveals a highly unlikely set of trajectories -- all the balls move to one corned of the arena

Second we'll demonstate the past hypothesis with a longer duration, one dimensional, simulation. 
* We will run the simulation with and without a past hypothesis
* We will notice that with the past hypothesis, until we reach a state of maximum entropy, the entropy values provide an ordering on time
* Running the simulation for the same duration without the past hypothesis there is no such ordering. A low entropy state is just as likely to be followed by a higher entropy state as it is likely to be preceeded by a high entropy state.  


<div id="container-left">
    <div class="pair">
        <input class="button" id="switchCollision" type="button" value="Switch Collision Type"/>
        <br>
        <label class="label" id="switchCollisionLabel" for="switchCollision">Push</label>
    </div>
    <div class="pair">
        <input class="button" id="toggleGravity" type="button" value="Toggle Gravity Mode"/>
        <br>
        <label class="label" id="toggleGravityLabel" for="toggleGravity">Off</label>
    </div>
</div>

<canvas id="canvas" style="width:100%; height: 300px">
</canvas>
    
<script>
    (function() {
        const canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

        const containing_div = document.getElementById('containing_div');

        // resize the canvas to fill browser window dynamically
        //window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
//            canvas.width = window.innerWidth;
//            canvas.height = window.innerHeight;
            canvas.width = containing_div.width;
            canvas.height = containing_div.height;
        }
        //resizeCanvas();
    })();
</script>
<script type="text/javascript" src="../assets/js/ball_index.js"></script>

<script src="https://d3js.org/d3.v4.js"></script>

<script>
    
function make_func_data(f, xmin, xmax) {
  const n = 50;
  const stepsize = (xmax - xmin)/n;
  // Start at the center of the field.
  let vx = xmin;
  const data = [];
  for (let i = 0; i < n; i++) {
    // Random walk with large or small steps.
    data.push({
      step: i,
      x: vx += stepsize,
      y: f(vx)
    });
  }
  return data;
}
                                                
function plot_1d_function(func, xmin, xmax) {

  const height = 320;
  const width = 480;
  const margin = {top: 20, right: 30, bottom: 20, left: 40};
  const x_s = d3.scaleLinear().domain([xmin, xmax]).range([margin.left, width - margin.right]);
  const y_s = d3.scaleLinear().domain([-1, 3]).range([height - margin.bottom, margin.top]);

  //Create SVG element
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
            
  var data = make_func_data(func, xmin, xmax);
            
  svg.append("g")
      .attr("transform", `translate(0,${y_s(0)})`)
      .call(d3.axisBottom(x_s).ticks(5,"f"));

  svg.append("g")
      .attr("transform", `translate(${x_s(0)},0)`)
      .call(d3.axisLeft(y_s).ticks(5, "f"));

  svg.append('g').append("path")
      .attr("fill", "none")
      .attr("stroke", 'black')
      .attr("stroke-width", 2)
      .attr("d", d3.line(d => x_s(d.x), d => y_s(d.y))(data))
      .attr('class', 'line');
      
  console.log(data);   
  return svg.node();
}
    
plot_1d_function((xa) => xa*xa, -3, 3);

</script>
