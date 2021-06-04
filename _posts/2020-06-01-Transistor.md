---
layout: post
title: Transistors & Logic Gates
category: Computer Organization & Programming
---

![Droid Gates meme](/assets/droid family.jpg)

Transistors are invented by a very bright man named William Shockley (1933-1954); they are the fundamental building blocks of modern computers and modern electronics.

Transistors are made with semiconducting materials,
which make controlling and modulating their conductivity rather easy via some edgy-sounding processes called doping and gating. A very common kind of transistor used in modern computers is called the MOS transistor, which stands for <em>metal-oxide semiconductor</em> transistor.

Taiwan is currently dominating the semiconductor industry in the gloabl market, unrivaled by any other country, as it has the best doping and gating technology--I hope you've bought some TSMC stock.

This post examines the two types of transistors: the P-type transistor and the N-type transistor, and how they are used to build the basic logic gates.

We will dive into five different logic gates--<code>NOT</code>, <code>NOR</code>, <code>OR</code>, <code>NAND</code>, and <code>AND</code>--and look at their configurations in transistors forms.

But why are we studying the logic gates in such a weird order that makes seemingly little sense? Well, we shall soon find out.

<!--more-->

## 1) P-Type Transistor

P-type transistors are normally closed, meaning that when the transistor gate is grounded at 0V, then the circuit connected to the P-type transistor acts like a closed circuit. If a light bulb is connected to such a circuit, then light bulb turns on (○･∀･)╯💡

But if the p-type transistor gate is supplied with voltage, then the transistor acts like an open or disconnected switch from the circuit and the light bulb's off (╯°Д°)╯ ┻━┻

Schematically, P-type transistors are drawn with a little dot on the gate, and the arrow on its gate points in the direction from source to drain.

## 2) N-Type Transistor

N-type transistors are normally open and thus its behavior to voltage supply is complementary to that of an P-type transistor.

When the N-type transistor is connected to ground, the transistor acts like an open switch between the source and the drain, creating an open circuit with high impedance. The current for circuit in such a state is said to be <em>floating</em> 🎈

If the N-type transistor is supplied with standard voltage of 1.2V, then it acts like a connected switch to the circuit, and light bulb on 💡

N-type transistors have arrows drawn on its gate in the pointing direction from drain to source.

A circuit that contains both P-type and N-type transistors is called a CMOS circuit, which stands for
<em>complementary metal-oxide semiconductor</em> circuit.

## NOT Gate

A P-type transistor and an N-type transistor.

![NOT Gate](/assets/not-gates.jpg)

[truth table]

## NOR Gate

2 P-type transistors in series and 2 N-type transistors in parallel.

![NOR Gate](/assets/nor gates.jpg)

[truth table/voltage table]

## OR Gate

NOR + NOT Gates

![OR Gate](/assets/or gates.jpg)

[truth table]

## NAND Gate

2 P-Type transistors in parallel and 2 N-type transistors in series.

![NAND Gate](/assets/nand gates.jpg)

[truth table]

## AND Gate

NAND + NOT Gates

![AND Gate](/assets/and gates.jpg)

[truth table]

## Building Gates in Minecraft

![Minecraft Gates](/assets/minecraft gates.jpg)
