
### Todo

- [x] Don't use useGameRouteData-refactor to use atoms
- [x] First game state should be splash screen with music and side bar
- [x] Implement socket events to handle game state transitions and playing video
- [ ] Implement socket events for all host actions
  + [x] categories zoom in/out/pan/reveal
  + [x] clues zoom in/out/reveal
  + [x] final jeopardy
  + [x] make random contestant active (with reveal sound)
  + [x] awarding points (jeopardy, double jeopardy)
  + [x] awarding points (daily double)
  + [ ] awarding points (final jeopardy)
  + [ ] incorrect answer behavior
- [ ] Implement score board
  + [ ] Sort by score then name
  + [ ] Animate sort changes
- [ ] Implement contestant controls
  + [x] buzzer
  + [x] wager (daily double)
  + [ ] wager and answer (final jeopardy)
  + [ ] answer timer (with sound effect)
- [x] When joining a game, sync gameState from host (in case not lobby)
- [x] Store all game state on server and sync with clients on connection
- [ ] Implement socket events for all contestant actions
- [x] Disable all actions for non-hosts
- [x] Remove transition when closing clues
- [ ] Make jeopardy round visually distinct from double jeopardy
- [x] Implement GameLayout
- [x] Join as contestant 
- [x] Join as spectator
- [ ] Move css into inline styles to be consistent
- [x] Combine gameState and setGameState hooks
- [ ] Remove clues from src and load from env variable
- [ ] Implement admin api endpoints
- [ ] Implement mute for all contestants (to avoid echo)
- [ ] Disable or hide disconnected contestants
- [ ] Improve error page
- [ ] Implement ability for host to set active player, or implement automatic activation of previous active contestant in case player answers incorrectly
- [ ] Refactor contestantsAtom to use an atom per contestant instead of one atom for all contestants
- [ ] Add strictmode
- [ ] Incorrect responses should deactivate contestant
