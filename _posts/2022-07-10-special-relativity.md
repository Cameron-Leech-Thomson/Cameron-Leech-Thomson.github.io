---
layout: post
title:  "Special Relativity (Very Briefly)"
date:   2022-07-10
excerpt: "A little appendix about the special relativity involved in my dissertation project, explained in the Virtual Reality Development post."
draft: true
---

In my [previous post](https://cameron-leech-thomson.github.io/blog/virtual-reality-development/), I mentioned how I'd cover a little about special relativity to help anyone who's wanting to have a look at my dissertation project. So here it is! This is a more digestible version of some of the research I did for my dissertation's literature review.

Special Relativity is the theory that describes the way that speed affects mass and time, which are most noticeable when moving at a significant portion of the speed of light. It came from Albert Einstein's 1905 paper '[On the Electrodynamics of Moving Bodies](https://users.physics.ox.ac.uk/~rtaylor/teaching/specrel.pdf)'. Even if you've never heard of special relativity, you've definitely heard of one of the results of that paper: \\( e = mc^2 \\) - the relation between mass and energy. Throughout my dissertation paper I used the example of a paperclip, and I'll do the same here. To put that equation into perspective, turning a paperclip into pure energy would result in about the same amount of energy being released as 'Little Boy' - the 15 kiloton atomic bomb dropped on Hiroshima during the Second World War. There were four main areas of special relativity that I wanted to focus on, which I'll briefly explain below. They are:

- Effects on Mass
- Length Contractions
- Doppler Shift
- Gravity (although this isn't a relativistic effect)

## Effects on Mass

An object technically has two masses in special relativity. The invariant/rest mass, also known as the Newtonian mass, is unchanging relative to the objects motion. The type of mass we're interested in is relativistic mass, which is the total quantity of energy in the system. You can imagine the rest mass to also be essentially the rest energy. For a particle of finite rest mass, *m<sub>rest</sub>* moving at speed *v* relative to the observer, the relativistic mass *m<sub>rel</sub>* can be calculated by the following equation, where *c* is the speed of light:

\\[ m_{rel} = \frac{m_{rest}}{\sqrt{1 - \frac{v^2}{c^2}}} \\]

To put this into practice, our paperclip weighs about 1g, but at 99.99% the speed of light, the paperclip would have a relative mass of 70.1g. This doesn't seem like much, but it's still a significant increase.

## Length Contractions

When an object is in motion, it actually contracts slightly in the direction of movement. Obviously we aren't able to see this happen as we do not come into contact with objects that travel such a significant portion of the speed of light, so for us the contractions are only by infinitesimally small amounts. As we increase the speed of an object, it'll start to become more visible. This is called a Lorentz Contraction, or more simply a length contraction. For a more in-depth look at this, you can [follow this link](https://en.wikipedia.org/wiki/Length_contraction). If an individual observes an event at time *t*, and positions *x*, *y*, and *z*, then another observes an event at a different time *t’*, and *x’* position, but the same *y* and *z*. Then the second observer would record values found in the series of equations below, where *γ* is the Lorentz Factor. The Lorentz Factor (*γ*) is seen in the bottom equation, where *v* is the objects velocity, and *c* is the speed of light.

\\[ t' = \gamma(t - \frac{v \cdot x}{c^{2}}), \\]
\\[ x' = \gamma(x - v \cdot t), \\]
\\[ y' = y, \\]
\\[ z' = z \\]

\\[ \gamma = \frac{1}{\sqrt{1-\frac{v^2}{c^2}}} \\]

The equations are not limited to just *x*, you could do the same operation to any of the three axes. If an object was travelling in a direction at 0.14c (95,000,000mph), the observed length would be 99% of the rest length. At 0.99c, the object would have contracted to 44% of its original length. To find the length of an object while in motion, you can use the following equation, where *L* is the observed length, *L<sub>0</sub>* is the rest length, *v* is the velocity, and *c* is the speed of light:

\\[ L = L_{0} \cdot \sqrt{1-\frac{v^{2}}{c^{2}}} \\]

## Doppler Shift

Doppler Shift is the bunching and stretching of electromagnetic radiation as it travels from a source to an observer. This is due to the speed that the object is travelling, either towards or away from the observer. When applied to visible light, this is what causes red shift and blue shift, and when applied to sound, this is what causes sirens to seemingly change the way they sound as the source passes by you. As an object travels away from us, the light waves that allow us to see it become stretched, resulting in a longer wavelength of light. Red has the longest wavelength of the visible spectrum, meaning that the light waves tend to gain a red hue. If an object is approaching the observer, the waves will bunch up instead, shortening the wavelengths. Violet and blue both have very short wavelengths, causing the bunched-up waves to appear slightly blue-violet coloured. The observed frequency of a wave *f* can be calculated by the equation below, where *f<sub>0</sub>* is the emitted frequency; *c* is the propagation speed of waves in the medium; *v<sub>r</sub>* is the speed of the receiver relative to the medium, which is added when moving towards the source, or subtracted otherwise; and *v<sub>s</sub>* is the speed of the source, which is added when moving away from the receiver, and subtracted otherwise:

\\[ f = \frac{c \pm v_{r}}{c \pm v_{s}} \\]

## Gravity

Gravity obviously isn't a relativistic effect, but there can be a lot done with it. As I'm sure you can imagine, they are all related to the speed at which an object falls. Gravity is the force exerted by an object onto the body it resides on - i.e. the force you exert against Earth, and the force that the Earth exerts back at you to keep you from flying off into space - is the weight of an object, calculated with the classic \\( f = m \cdot a \\). Where *f* is the force exerted by the object in a direction, *m* is the object's mass, and *a* is the acceleration the object is experiencing. The force you exert on Earth will be your mass, multiplied by 9.81m/s<sup>2</sup>. If we were to change the strength of gravity, this would cause the force exerted by all objects to change, making them 'weigh' more or less, and fall faster or slower. In the context of the project I'm making, this could be quite fun to play with.
