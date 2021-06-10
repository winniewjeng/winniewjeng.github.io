---
layout: post
title: Circularly Linked Lists
category: Data Structure & Algorithm
---

Article coming soon....

General brush stroke:

<pre>
  -The great thing about circularly linked list is that it's circular.

  -Has only the tail pointer to keep track of the tails.

  -<code>insertHead()</code>, <code>insertTail()</code>, <code>removeHead()</code> are all O(1), using the <code>rotate()</code>method.

 -Never have to check for null because there's no null node. Saves a ton of overhead time complexity if processing millions or billions of data.

 -Applications? Music/Video playlists, CPU round robin time sharing.

  -Round Robin-time slice, creating the illusion of multitasking for single core CPU

  -How is CLL an improvement from the tranditional CPU scheduler?
</pre>
