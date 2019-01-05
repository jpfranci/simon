## Difficulties
- Chrome failed to play audio of first note properly, citing an uncaught promise on the NoteBox class. 
Was not altered as NoteBox is supposed to not be altered. This was fixed after the first input from the user.
- Note: this is a rough submission, so I didn't use the onclick argument of the NoteBox constructor.

## Methods
- I created a new function called PlaySimon, which first setup the NoteBoxes that assigned keys to each NoteBox and then looped through the boxes 
and added event listeners to each box. The game starts by displaying the first key of the sequence and then waits for user input. It reacts
accordingly when the user clicks to a box and if it does not match then a new game is started otherwise the index to be compared is incremented.

- There is a delay before a new game is started because it becomes unclear if a new game is started immediately as the previous note would still be playing. 
This is unclear to the user as to which note is the new game.

- If the end of the sequence is reached (index == sequence length) then the sequence is incremented and a new round is started. 
At this point, the index to be looked at is reset to 0 and the sequence plays again and the user must match the sequence from scratch.


## Resources Used
- none
