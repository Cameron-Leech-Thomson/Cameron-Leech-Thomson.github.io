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

Part of what makes VR development unique from traditional methods is that the player character needs a lot more moving parts to be functional. Each controller is its own unique object and needs to be able to move with the player and act on their own. As well as this, the head needs to be tracked so that the camera(s) can follow where the user is looking. All of this adds up to make the whole player character much more complex for the same result. In-game locomotion is vastly different too, as most VR systems use teleportation to move around the world, with the option of moving with the thumbsticks. Teleportation is preferred as it may be slightly more disorienting, but it is much less likely to cause motion sickness for the user. This means that each traversable area needs to have a script to allow it to support the user's movement, and each controller will need to have a script to allow the user to aim and activate the teleportation, and a separate script to support the other method if it is being used. The world itself needs to be made with a VR player in mind, as it is possible they may not be able to reach certain objects, or have sufficient room to perform specific actions in real life. This adds to the complexity of the design, but is not so much that it should deter a developer, as once these areas are covered, the rest is rather similar to the more traditional methods of development.

### Player

To create the player character, I began with the default [player rig from the Unity XR Toolkit](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@1.0/api/UnityEngine.XR.Interaction.Toolkit.XRRig.html). The default rig allows you to pick up and put down objects, as well as move around on designated areas. While this is a good start, it needed plenty of work. Originally the player could grab objects from up to 10m away, which was changed to only letting them pick things up that their hands could physically touch. If the player tried to teleport with both hands at the same time, they could cover enormous distances extremely quickly, so I added a script that only lets one teleport reticle be active at a time. I then changed the reticles appearance to how you can see it in the image at the top of the page. To make sure that the user could move and throw objects around comfortably even with limited space, I gave the user the ability to hold down the trigger while holding an item. This would charge up a power bar, launching the object on release. On the release of the trigger, the following method is used:

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
    <source src="{{site.url}}/videos/Grab_Animation.mp4"  type="video/mp4">
</video>

After finishing the launch object feature, as well as the rest of the grab mechanics, I moved on to prettying up the hands, by animating them. This took an extremely long time, as I had to animate each individual joint, frame by frame, for a full hand opening/closing animation. Moving 14 joints per frame, and moving them into convincing positions for each frame was pretty painful! There was also plenty of coding to sync the animations with the user's button presses, but that's not very interesting. You can see the result in the video. If you do want to see the scripts, you can find them in the repository [here](https://github.com/Cameron-Leech-Thomson/dissertation-project/tree/main/VR%20App/Assets/Scripts).

### Special Relativity

Unity's default physics were replaced with my own [**PhysicsController**](https://github.com/Cameron-Leech-Thomson/dissertation-project/tree/main/VR%20App/Assets/Scripts/PhysicsController.cs), as I needed to change the sizes, masses, and forces acting upon them in different ways. During the **FixedUpdate()** function - which is most useful for computing physics options - the values for gravity, Doppler shift, and the speed of light are taken from the menu where the user can change them, and are used to calculate the effects of all physics objects. Each physics object has a script that saves its values at rest, so they can be used in the functions to calculate their relativistic counterparts. First, the object's [**RigidBody**](https://docs.unity3d.com/ScriptReference/Rigidbody.html) is used to apply gravity's downward force, scaling with the different values that the user can set it to (0-25m/s<sup>2</sup>).
<video class="image right" autoplay muted loop >
    <source src="{{site.url}}/videos/LengthContraction.mp4"  type="video/mp4">
</video>
Next, we check of the object is moving, if it is, we apply the changes caused by length contractions and relativistic mass. We simply take the velocity of the object, and it's rest mass, and use it to calculate the relativistic mass. For the calculating the length contractions, we actually cheat a little bit. Rather than scaling the contraction in the direction of movement, we do it in all directions uniformly. This is because during testing it felt very clunky and unpleasant to use, so I changed it. There are very few changes that need to be made to have the objects contract in their direction of movement. The calculation of the length contractions actually has a minimum cap of 1/3 of the object's original size, as if it were any smaller, it would be very difficult to keep track of the object sometimes.

<video class="image right" autoplay muted loop >
    <source src="{{site.url}}/videos/DopplerShift.mp4"  type="video/mp4">
</video>

The Doppler shift effects were actually pretty difficult to get working. To get the objects to red & blue shift, I had to first check whether or not they were moving towards or away from the player. The way I did this was a pretty crude solution, but it worked nonetheless. The physics object's position is checked against it's position in the previous frame, and if the distance is larger than before, we assume the object is travelling away from us, and apply a red hue to the object's specular component. If the distance is smaller than the previous frame, we assume the opposite, and apply a blue-violet hue. To scale how much each object's colour would change, I was using the HSV colour space rather than RGB, I did this because it's cyclical, so red and blue end up next to each other at the end. Unity's colour selector displayed the colour space as a big circle, meaning that the blue-to-red transition was over the last 120&deg; of the circle. So starting from the midpoint of 300&deg;, there was 60&deg; of red and 60&deg; of blue to use. The speed that the object was going was proportioned into a range of 0-60, and then either added or subtracted from 300 - depending on whether the colour shift should be blue or red. The colour is then applied to the object's hue value in its material. This was the difficult part. I had to get the material and mesh renderers to change the material properties for the objects, and then apply a [**Material Property Block**](https://docs.unity3d.com/ScriptReference/MaterialPropertyBlock.html) to mask the changes onto the existing properties, I also had to have a way to reset them to default when they weren't moving, so each object needed to store a copy of its original shader. After a good few days of tinkering, the methods that actually did the job were as follows:

{% highlight csharp %}
public void setColour(Color col){
    if (materialPropertyBlock == null){
        materialPropertyBlock = new MaterialPropertyBlock();
    }
    // Set the colour to the MPB:
    materialPropertyBlock.SetFloat(specularHighlights, 1f); 
    materialPropertyBlock.SetColor(specularID, col);
    float h, s, v = 0;
    Color.RGBToHSV(materialPropertyBlock.GetColor(specularID), out h, out s, out v);
    // Apply the propertyBlock to the renderers:
    foreach(Renderer rend in renderers){
        rend.SetPropertyBlock(materialPropertyBlock);
    }
    colourChanged = true;
}

public void resetColours(){
    if (materialPropertyBlock == null){
        materialPropertyBlock = new MaterialPropertyBlock();
    }
    // Set the colour to the MPB:
    materialPropertyBlock.SetFloat(specularHighlights, 1f); 
    materialPropertyBlock.SetColor(specularID, defaultSpecular);
    float h, s, v = 0;
    Color.RGBToHSV(materialPropertyBlock.GetColor(specularID), out h, out s, out v);
    foreach(Renderer rend in renderers){
        // Apply the property to the renderer:
        rend.SetPropertyBlock(materialPropertyBlock);
    }
    colourChanged = false;
}
{% endhighlight %}

You can find the rest of this script [here](https://github.com/Cameron-Leech-Thomson/dissertation-project/tree/main/VR%20App/Assets/Scripts/ValuesAtRest.cs) (it's pretty messy). Compared to some of my other attempts, this really isn't a lot at all. After the Doppler shift changes, the final part of the **FixedUpdate()** function checks if the object's *aren't* moving, and resets their size, mass, and material properties back to their defaults. This also happens if an object is grabbed by the user.

### Levels


