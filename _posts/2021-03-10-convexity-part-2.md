---
layout: post
title: "A very brief introduction to convex optimization (Part 2)"
author: "Ben Lansdell"
categories: posts
tags: [convexity]
image: convexchart.png
---


## A very short introduction to convex optimization -- Part 2

Here I cover a basic introduction to concepts and theory of convex optimization. The goal is to give an impression of why this is an important area of optimization, what its applications are, and some intiution for how it works. This is of course not meant to overview all areas of convex optimization, it's a huge topic, but more to give a flavor of the area by describing some results and theory, particularly as they relate to other areas that may be familiar to people (e.g. Lagrange multipliers). By presenting this in a notebook the aim is to focus on providing some geometric intuition whenever possible through plotting simple examples whose parameters you can play with. Images not generated in this notebook are taken from one of the standard references: [Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf), by Boyd and Vandenberghe. 

This will be a (for the moment) two part post. In this part I will cover:

1. Why care about convexity?
2. Basics of convex functions and sets
3. A convergence proof of gradient descent

It will assume some basic familiarity with the idea of optimization, linear algebra and some machine learning basics.

### Overview

Most machine learning problems end up as some form of optimization problem, thus a basic understanding of optimization is very useful, or sometimes necessary, to solve a given problem. 

For instance, in simple linear regression, given some data $$(y, X)$$ and a model $$y \sim X\beta + \epsilon$$, we aim to find the weights $$\beta$$ that minimize:

$$
\beta^* = \text{argmin}_\beta \|y - X\beta\|^2_2.
$$

In general, we consider the following basic problem:

$$
x^* = \text{argmin}_{x\in\mathcal{X}} f(x)
$$

subject to constraints:

$$
g_i(x) \le 0\\
h_j(x) = 0.
$$

Convex optimization deals with problems in which $$f(x)$$ and $$g_i(x)$$ are convex functions, and $$h_j(x)$$ are affine (of the form $$a_j^Tx = b_j$$).


