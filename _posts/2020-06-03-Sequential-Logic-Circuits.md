---
layout: post
title: Sequential Logic Circuits
category: Computer Organization & Programming
---

![Memory Management](/assets/memory management.jpg)

Sequential logic circuits have information storage ability--that is, sequential logic circuits can remember information of the previous states, which then affect the logic of the current and/or future states. This feature remembering the past state to make logical decision about the current or future states makes the circuits a finite state machine. The storage elements of the finite state machine are called memories.

In this post, we will examine two basic sequential logic circuits--the R-S Latch and the Gated D Latch--and discuss how they are used to build registers, which are the storage elements in modern computer's CPU. Understanding these components would then lead us to exolore the concepts of address space and addressability.

<!--more-->

## R-S Latch

The R and S in R-S Latch stand for Reset and Set. R-S Latches are composed of two gates and two input. The R input is connected to one gate, and the S input is connected to the other gate. The output of each of the gate then serves as the second input for the other gate. Kind of a weird, twisted design, eh?

This weird, twisted design provides signal "feedback" that enables the cirucit to remember its previous logical state even if the controlling input signal changes.

The two logic gates of R-S Latch can either be both <code>NAND</code> Gates or both <code>NOR</code> Gates. Logics of the two different implementations for R-S Latch differ slightly, but are still very similar.

## NAND R-S Latch

The NAND R-S Latch has 3 valid states:

<div>(R,S) = </div>
<div style="padding-left: 3rem;"> i.   (0,1),</div>
<div style="padding-left: 3rem;"> ii.  (1,0), and </div>
<div style="padding-left: 3rem;"> iii. (1,1)</div>
<br>
<b>Figure 1</b> shows the 3 valid + 1 invalid states of the NAND R-S Latch.
![NAND R-S Latch](/assets/r-s latch.jpg)

For inputs R = 0 and S = 1, the <code>set bit</code> is on so the current output is Q = 1 and the next output will be Q<sub>next</sub> = 0.

For inputs R = 1 and S = 0, the <code>reset bit</code> is on so the current output is Q = 0 and the next output will be Q<sub>next</sub> = 1.

For inputs R = 1 and S = 1, both the <code>set bit</code> and the <code>reset bit</code> are on. In such a case, outputs Q and Q<sub>next</sub> hold whatever the current state is.

Inputs R = 0 and S = 0 are invalid for the NAND R-S Latch. If such inputs are set, circuit has high impedance and the current enters into a floating state.

<b>Figure 2</b> provides a truth table for the R-S Latch.

<div class="truth-table-container">
<table class="truth-table">
  <thead>
    <tr>
      <th>R</th>
      <th>S</th>
      <th> </th>
      <th>Q</th>
      <th>Q<sub>next</sub></th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>0</td>
      <td>0</td>
      <td></td>
      <td>INV</td>
      <td>INV</td>
    </tr>
    <tr>
      <td>0</td>
      <td>1</td>
      <td></td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <td>1</td>
      <td>0</td>
      <td></td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <td>1</td>
      <td>1</td>
      <td></td>
      <td>HOLD</td>
      <td>HOLD</td>
    </tr>
  </tbody>
</table>
</div>

For the NOR R-S Latch, the logics for (R,S) = (0,0) and (R,S) = (1,1) are flipped.

## Gated D Latch

Electronic engineers are rather indecisive in determining what the D in Gated D Latch stands for. Some says that D stands for Data, and some says that it stands for Delay. I say it stands for Dork.
