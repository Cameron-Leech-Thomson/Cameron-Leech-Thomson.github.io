---
layout: post
title:  "Arduino and The Internet of Things"
date:   2022-03-18
excerpt: "Using the Internet of Things to communicate with an Adafruit Arduino car."
image: "/images/IoTSide.JPG"
caption: "Adafruit Arduino Car Used in the Project."
alt: "Small Arduino car with a circuit board and battery on top."
draft: false
---

During our Internet of Things module, we were given free rein to pick what to do for our assignment, provided it hit some specific points to connect it to the taught content. I decided to use the Adafruit Arduino Car we got to use during the module. This was my first foray into Arduino, although I am familiar with C and C++, so it didn't take too much getting used to, allowing me to jump into experimenting with the Arduino itself as quickly as possible. The system I created allowed a user to upload a formatted set of instructions to a hosted site, which the Arduino car would connect to and download the most recent instructions from the site, before carrying them out. A breakdown of the project can be found below, this was one of the most entertaining projects throughout my university career, hope you enjoy!

## Demo Video

There is a demo video of the robot in action on [my GitHub page](https://github.com/Cameron-Leech-Thomson/OTA-Robot/), under the name `LA2 Demo.mp4`. The instructions are also in the `README.md` section of the repository. It must be noted here that the robot was moving on an uneven floor, so even though the robot is trying to move straight forward, it does veer off to one side.

## Hardware

The hardware used is mostly the basic Adafruit Simple Robot Car, with a couple of modifications. First, the battery pack that powers the Motor Shield does not also power the ESP32, therefore an extra Lithium-Polymer battery has been added to the top. Its wires have been added to the breadboard, with a switch so that power is not wasted. You can see the result in **the images below**.

<table>
    <tr>
        <th style="text-align: center;"> Top-down View </th>
        <th style="text-align: center;"> Side View </th>
        <th style="text-align: center;"> Front View </th>
    </tr>
    <tr>
        <td>
            <img src="/images/IoTTop.JPG" alt="Top-down view." style="width:20%; height:auto;">
        </td>
        <td>
            <img src="/images/IoTSide.JPG" alt="Side view." style="width:20%; height:auto;">
        </td>
        <td>
            <img src="/images/IoTFront.JPG" alt="Front view." style="width:20%; height:auto;">
        </td>
    </tr>
</table>

<!---
| Top-down View | Side View | Front View |
|-|-|-|
| ![Top-down view.](/images/IoTTop.JPG) | ![Side view.](/images/IoTSide.JPG) | ![Front view.](/images/IoTFront.JPG) |
--->

## Project Structure

### Server

In the `LA2/firmware` folder, there is a file called `launch.bat`, this file launches the python server that serves the `instructions.txt` file. This is the file that is accessed by the robot to carry out its instructions. The instructions themselves need to adhere to a specific format, explained in the **Supplying Instructions** section.

### Robot

The actual C++ code inside of the `LA2/ProjectThing` folder starts by using the exercises from the labs to connect to the server, this code is in `Ex09.cpp`. The file `Ex10.cpp` is the actual controller for the robot and contains the methods used to read `instructions.txt` into executable C++. This was heavily modified from the original lab work and made to suit the needs of the Adafruit MotorShield. The added methods are as follows:

- `vector<String> splitString(String string, char delimiter)`
    - This function takes in a String object and a single character as a delimiter, and splits the String out into a vector of substrings, similar to Python's `string.split(delimiter)`. It does this by iterating over the string to get the number of occurances of the delimiter, and then looping that many times from the previous occurance to the next. After each iteration the `from` occurance is set to the `to` occurance, and the `to` occurance is set to the next occurance by using the `String.indexOf(delimiter, offset)`. Each `from`-`to` pair is added as a substring to the resulting vector, and after iterating over the whole string, the vector is returned.
- `void doInstruction(String dir, int spd, Motors motor)`
    - `doInstruction` takes in an individual instruction to be executed on a motor and parses the values to execute the instructions provided. `Motors` is a public enum defined at the top of the file, consisting of two values, **LEFT** and **RIGHT**, this allows the method to decide which motor to pass the instructions to. If the provided value is not "LEFT" or "RIGHT", then it will not execute the current instruction and pass an error message to the serial monitor. Otherwise, it will check whether the instruction is to move forward, backward, or stop, and at what speed, and run the code to do this.
- `int clampValue(int value, int _min, int _max)`
    - This function takes in an integer value, as well as a minimum and maximum value, and will 'clamp' it between the two values. If the value is within the range of `_min` and `_max`, it will return itself. If the value is larger than `_max`, it will return `_max`, or if it is less than `_min`, it will return `_min`.
- `vector<String> readCommand(String string)`
    - Takes in the command (e.g. "forwards-150"), and turns it into two values of data in a `vector` of type `String`. It splits the string by the '-' delimiter, and adds the direction to the output. If there is no valid direction (by checking `dir.toInt() != 0`), then we assume that only speed is provided, and so we add that same value again so the vector is of length 2. This invalid direction is handled in `doInstruction()` by stopping on an invalid direction input, so it doesn't need to be formatted here. We then also check if there is no valid speed value, and if there isn't, then we use the default value, which is defined at the top of the file. Once both the direction and speed have been processed, they are added to the output vector and returned to `readInstructions()`.
- `void readInstructions(String instr)`
    - The function notifies the user that an instruction is being processed by outputting to the serial monitor and blinking the onboard LED. The instruction (e.g. "forwards-150 forwards-150 5"), and splits the string into a vector with a space as the delimiter. Similar to `readCommand()`, we check for missing inputs. If the length of the instructions vector is less than 3, we check if the missing value is the duration (by using `.toInt() == 0`). If the only missing value is indeed direction, we add the default value to the vector and continue, otherwise we report the error and continue to the next instruction. Then, the `readCommand()` function is used to convert each command into valid direction and speed values, and then each direction-speed pair is passed to `doInstruction()`. After setting the motors to the provided speed and direction, we wait for the provided duration, before setting both motors back to their **RELEASE** status.
- `void checkAbort()`
    - Reads the serial monitor to check for any user input, if the user has inoutted anything, then check if it is a valid abort message. Any of the following are valid: "stop", "exit", "abort", or "quit". In the case that the user has supplied a valid abort message, we then count down, blinking each time, and then set the ESP to go into deep sleep mode with the line `esp_deep_sleep_start()`.
- `void requestInstructions()`
    - This function is the root of all of those above. Using `doCloudGet(http, targetFile)`, we attempt to connect to the server and retrieve the file with a name matching `targetFile` - in this case - "instructions.txt". If the request fails, we notify the user of the error, provide the return code, and break out of the function. If the request succeeds, we get the contents of the retrieved file, and compare them to the last executed instructions, if they are the same instructions as before, we don't bother executing them. If not, we execute the new instructions. First we notify the user of new instructions then split the string by a newline character. We then iterate over every line except from the first (as this contains the headers), and run `readInstructions(line)` on each line. After completing the loop, we notify the user that the instructions have been completed, and call `http.end()` to free resources.
- `void setupRobot()`
    - This function sets up the robot and the server connection. It first calls `setupServer()`, which is identical to the setup of `Ex09.cpp`, before attempting to connect to the Motor Shield. After connecting to the Motor Shield, we begin a WiFi connection and try to connect to the network with the provided IP & Port. Upon success, we notify the user, and reset the motors by setting them to their **RELEASE** status. We then request the first set of instructions.
- `void loopRobot()`
    - Every 10000 iterations, we make a request for new instructions. This happens about once every few seconds. On every iteration, we check if the user has aborted code execution, as well as handling the client like in `Ex09.cpp`

## Supplying Instructions

The instructions follow the following format "LEFTMOTOR-SPEED RIGHTMOTOR-SPEED DURATION(seconds)". The top line should always be the headers, as if you give instructions on the first line, they will be skipped. However, as you can see from the method explanations above, the system is quite forgiving. If you forget to provide a speed value, it will default to 150, if you forget to provide a duration value, it will default to 5 seconds, if you forget to provide a direction, it will default to doing nothing (**RELEASE** state). Valid directions include (not case-sensitive): "**stop**", "**release**", "**forward**", "**forwards**", "**backward**", "**backwards**". Each instruction needs to be seperated on a new line, and each command should be separated by a space, you can see an example below:

### Valid Instructions:
```
LEFTMOTOR-SPEED RIGHTMOTOR-SPEED DURATION(sec)
forward-25 forward-25 5
forward-175 stop-0 3
backward-100 backward-100 3
backward-150 stop-0 2
```

### Valid Instructions (Some Values Missed):
```
LEFTMOTOR-SPEED RIGHTMOTOR-SPEED DURATION(sec)
forward-25 forward-25 
forward-175 stop-0 3
backward-100 backwards 3
backward-150 stop 2
```

## Serial Monitor Output

*Note: Sections with* `[R4P]` *have been **R**emoved for **P**rivacy reasons.*

```
Server Setup...
AP SSID: Thing-7C9EBDD8FD58; IP address(es): local=[R4P]; AP=[R4P]
Mode: STA+AP
Channel: 1
SSID (10): [R4P]
Passphrase (12): [R4P]
BSSID set: 0
HTTP server started

Robot Setup...
Connecting to Motor Shield: Motor Shield found!
Attempting Network Connection...
Connected to Network!

Getting http://[R4P]:8000/instructions.txt...
Retrived instructions.txt. Return Code: 200; Size: 0

No new instructions detected. System running for 9 seconds.

Getting http://[R4P]:8000/instructions.txt...
Retrived instructions.txt. Return Code: 200; Size: 0

No new instructions detected. System running for 22 seconds.

Getting http://[R4P]:8000/instructions.txt...
Retrived instructions.txt. Return Code: 200; Size: 139

New instructions detected!
Reading current instructions: [ forward-25 forward-25 5 ]
Left motor moving forward at speed 25. 
Right motor moving forward at speed 25.

Reading current instructions: [ forward-175 stop-0 3 ]
Left motor moving forward at speed 175. 
Right motor stopped.

Reading current instructions: [ backward-100 stop 3 ]
No speed value detected in command [ stop ], defaulting to 150.
Left motor moving backward at speed 100. 
Right motor stopped.

Reading current instructions: [ backward-150 backward 2 ]
No speed value detected in command [ backward ], defaulting to 150.
Left motor moving backward at speed 150. 
Right motor moving backward at speed 150. 

Instructions complete! System running for 50 seconds.

Getting http://[R4P]:8000/instructions.txt...
Retrived instructions.txt. Return Code: 200; Size: 139

No new instructions detected. System running for 63 seconds.
```
