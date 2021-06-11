---
layout: post
title: "Exploration of Minkowsky space"
author: "Ben Lansdell"
categories: posts
tags: [special-relativity]
image: convexchart.png
---

Here I cover a basic introduction to concepts and theory of convex optimization. The goal is to give an impression of why this is an important area of optimization, what its applications are, and some intiution for how it works. This is of course not meant to overview all areas of convex optimization, it's a huge topic, but more to give a flavor of the area by describing some results and theory, particularly as they relate to other areas that may be familiar to some (e.g. the method of Lagrange multipliers). By presenting this in a notebook the aim is to focus on providing some geometric intuition whenever possible through plotting simple examples whose parameters you can play with. Images not generated in this notebook are taken from one of the standard references: [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf), by Boyd and Vandenberghe. 

This will be a (for the moment) two part post. In this part I will cover:

1. Why care about convexity?
2. Basics of convex functions and sets
3. A convergence proof of gradient descent

It will assume some basic familiarity with the idea of optimization, linear algebra and some machine learning basics.

### Overview
