---
layout: post
title: Von Neumann Model
category: Organization & Programming
---

In the early days of computing, there are many different competing models with different hardware architecture designs.

The Harvey Mark Model and Von Neumann Model are the two most prominent models in rival. They both have a CPU that controls ALU, I/O, and Memory. However, in the Harvard Mark Model, data memory and instruction memory (computer programs) are stored seperately, and in the Von Neumann Model has only one place to store the memory--data and instruciton live in the same address space.

Von Neumann's model is what most modern computers adopt.

So what's the advantage of having one unified memory in Von Neumann's model? A big one is its design requirement of only one memory circuit as opposed to two memory circuits. For memory, <em>a bit is a bit</em>. If we can use the bit efficiently, we can handle memory efficiently. But building memory is not a simple process--we need to build decoder, muxes, and flip flops, as seen in my other blog posts. If we have one place for memory, we only need to build one circuit for memory, as opposed to two discrete memories.

But a disadvantage with one memory location is security. Machine instruction memory can be modified either by accident or on purpose with another program in the Von Neumann Model, which will not be a problem with the Harvey Mark Model. However, today we choose to deal with this security risk instead of having two memories.

6-3-2021 video
