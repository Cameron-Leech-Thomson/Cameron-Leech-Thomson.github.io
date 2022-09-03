---
layout: post
title:  "Virtual Reality Development"
date:   2022-07-09
excerpt: "Developing for Virtual Reality is a new and interesting challenge, and I've recently had the pleasure of using VR for my undergraduate dissertation project!"
image: "/images/FinalController2.PNG"
caption: "Image Taken from the Final Implementation of My Dissertation Project."
credit: "https://github.com/Cameron-Leech-Thomson/dissertation-project"
alt: "Screenshot from a Virtual Reality environment. A white, clinical looking room, with a black and blue ramp surrounded by glass. A ball is falling down the ramp. The player is attempting to move forward towards the ramp by using a white ray to aim where they will move to."
draft: true
---

The 2021/2022 university year was the final year of my undergraduate course at The University of Sheffield. Over the year I was tasked with completing my dissertation project along with my other modules. I missed the chance to accept one of the proposed projects from the Computer Science staff, so I was left to propose my own project, which was exciting but pretty daunting at the same time. Early in 2021 I'd gotten an [Oculus Quest 2](https://store.facebook.com/gb/en/quest/products/quest-2/?utm_source=www.google.com&utm_medium=oculusredirect), and got into the idea of developing something for VR - this was my perfect opportunity. So I proposed the idea of making a virtual reality simulation. Originally I wasn't sure what to make it on, until one of my friends suggested Special Relativity, which seemed like a good idea as I'm interested in physics, and I had two housemates studying it. The perfect arrangement!

## Where to Start?

At first I felt a little lost, as development tools for VR are still somewhat sparse, but after a while, I realised that Unity has probably the best support I can get for such an undertaking. So I started with some tutorials on how to develop for VR, as well as looking at the Oculus documentation, as well as Unity's XR Development Toolkit, which I would definitely recommend to anyone looking to start VR development. It's very user friendly, and you can take a look at it [here](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@1.0/manual/index.html) (and if you're looking for the Scripting API, [click here](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@1.0/api/index.html)). After making a start with the Unity tutorials, I felt ready to start on my own project. I then began my research on the effects of Special Relativity, and started planning how I could simulate this accurately in VR.

> If you'd like to read about the aspects of special relativity that I made use of, take a look at [this post](https://cameron-leech-thomson.github.io/blog/special-relativity/).

## Overview

The plan for the project is to have a realistic simulation of the effects of special relativity while in virtual reality, and encourage the player to learn how to manipulate the effects by having them pass through puzzles of varying difficulties. This should give the player a challenge while pushing them to learn more and more. There will also be a sandbox area at the end to allow them to experiment more freely.

## Design

### Player

To create the player character, I began with the default player rig from the Unity XR Toolkit. The default rig allows you to pick up and put down objects, as well as move around on designated areas. While this is a good start, it needed plenty of work. Originally the player could grab objects from up to 10m away, which was changed to only letting them pick things up that their hands could physically touch. If the player tried to teleport with both hands at the same time, they could cover enormous distances extremely quickly, so I added a script that only lets one teleport reticle be active at a time. I then changed the reticles appearance to how you can see it in the image at the top of the page. To make sure that the user could move and throw objects around comfortably even with limited space, I gave the user the ability to hold down the trigger while holding an item. This would charge up a power bar, launching the object on release. On the release of the trigger, the following method is used:

{% highlight csharp %}
public void fire(){
    if (interactor.isSelectActive){
        powerBar.gameObject.SetActive(false);
        // Get the interactable that is currently selected:
        XRBaseInteractable heldItem = interactor.selectTarget;
        Rigidbody rb = heldItem.gameObject.GetComponent<Rigidbody>();
        interactor.allowSelect = false;
        // Deselect the interactable before launching:
        try{
            // Try to deselect the object:
            interactionManager.SelectExit(interactor, heldItem);
        } catch(NullReferenceException){
            // In the case that the user has already let go and a
            // NullReferenceException is thrown, return the users ability to select:
            StartCoroutine(resetSelect());
            return;
        }

        // Launch the object:
        rb.AddForce(transform.forward * currentPower, ForceMode.VelocityChange);

        StartCoroutine(resetSelect());

        // Reset values:
        currentPower = 0;
        heldItem = null;
        itemSelected(false);
        holdingToFire(false);
    }
}
{% endhighlight %}

While snippet doesn't look like much, I find it quite interesting anyway. The first half of the code is all dedicated to making sure the object is still in the player's hand, if it isn't, the object isn't launched (obviously) and the controller regains the ability to pick up other objects. Once the object has been launched, the ability to select items can't be given back immediately, as the object would just be caught again, so we need the coroutine **resetSelect()**, to give the object some time to get out of the player's hands before granting them the ability to grab again. In another thread, the system simply waits for one second before giving back the ability to grab.

{% highlight csharp %}
private IEnumerator resetSelect(){
    yield return new WaitForSeconds(1f);
   
    interactor.allowSelect = true;
}
{% endhighlight %}

<video class="image right" autoplay muted loop >
    <source src="videos/Grab_Animation.mp4"  type="video/mp4">
</video>

After finishing the launch object feature, as well as the rest of the grab mechanics, I moved on to prettying up the hands, by animating them. This took an extremely long time, as I had to animate each individual joint, frame by frame, for a full hand opening/closing animation. Moving 14 joints per frame, and moving them into convincing positions for each frame was pretty painful! There was also plenty of coding to sync the animations with the user's button presses, but that's not very interesting. You can see the result in the video.

### Special Relativity



### Levels


