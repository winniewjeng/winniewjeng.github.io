---
layout: post
title: LC3 Instruction Set Architecture
category: Organization & Programming
---

Having learned about datapath and microcode, we can now treat the internal machine instruction flow of LC3 as a blackbox and abstract up one level to talk about Instruction Set Architecture (ISA), which specifies everything in the computer that is available to a programmer when writing programsin machine language.

The ISA specifies the memory organization, register set, and instruction set, including the opcodes, data types, and addressing modes of the instructions in the instruction set.

## Memory Organization

In LC3, the address space is 2<sup>16</sup> = 65536. The unique address locations are 0 - 65535, or x0000 - xFFFF. The addressability is 16 bits, or a word, and it is strictly word addressable, not byte addressable (cannot access a byte, unlike Intel x86 or ARM).

The avaialbe addresses for users programs live in memory x3000 - x FDFF inclusive.

## ISA Design Philosophy

Two major design philosophies: CISC (Complex Instruction Set Computer) and RISC (Reduced Instruction Set Computer).

In CISC, one machine code instruction can do a very complicated, high level task that people use often, like resizing an array. Examples of CISC are Intel x86, DEC VAX, IBM Z-series.

RISC, on the other hand, has a very limited vocabulary. If a programmer wants to resize an array in a RISC machine, the programmer needs to write many lines of code to perform the resizing, which is harder to accomplish, but the advantage is that it exposes as much instruction to the compiler as possible to make optimization easier. Examples of RISC are ARM, MIPS, PowerPC, and our very own LC3.

## Opcode

LC3 allocates 4 bits out of the 16-bit instruction addressability for opcode. There are 2<sup>4</sup> = 16 different possible opcode instructions (Technically 15 opcodes because number 13 is reserved).

## Assembly Language

Assembly langauge is the human-readable representation of the machine managuge. Assembly and machine langauge instructions have one-to-one correspondence.

<footer>
<br>
Supplementary lecture material: Dr. Caleb Southern, 06-08-2020
<br><br>
Further reading: Introduction to Computing Systems: From Bits and Gates to C and Beyond, 3rd ed, Chapters 5.2
</footer>
