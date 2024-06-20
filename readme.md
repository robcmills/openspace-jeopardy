
### Todo

- [x] Don't use useGameRouteData-refactor to use atoms
- [x] First game state should be splash screen with music and side bar
- [x] Implement socket events to handle game state transitions and playing video
- [x] Implement socket events for all host actions
  + [x] categories zoom in/out/pan/reveal
  + [x] clues zoom in/out/reveal
  + [x] final jeopardy
  + [x] make random contestant active (with reveal sound)
  + [x] awarding points (jeopardy, double jeopardy)
  + [x] awarding points (daily double)
  + [x] awarding points (final jeopardy)
  + [x] incorrect answer behavior
- [x] Implement score board
  + [x] Sort by score then name
- [x] Implement contestant controls
  + [x] buzzer
  + [x] wager (daily double)
  + [x] wager and answer (final jeopardy)
  + [x] answer timer (with sound effect)
  + [x] reset timer when contestant buzzes in
- [x] When joining a game, sync gameState from host (in case not lobby)
- [x] Store all game state on server and sync with clients on connection
- [x] Implement socket events for all contestant actions
- [x] Disable all actions for non-hosts
- [x] Remove transition when closing clues
- [x] Ellipsify long names
- [ ] Make jeopardy round visually distinct from double jeopardy
- [x] Implement GameLayout
- [x] Join as contestant 
- [x] Join as spectator
- [ ] Move css into inline styles to be consistent
- [x] Combine gameState and setGameState hooks
- [ ] Remove clues from src and load from env variable
- [ ] Clean up clues type
- [ ] Implement admin api endpoints
- [ ] Implement mute for all contestants (to avoid echo)
- [ ] Disable or hide disconnected contestants
- [ ] Improve error page
- [ ] Implement ability for host to set active player, or implement automatic activation of previous active contestant in case player answers incorrectly
- [ ] Refactor contestantsAtom to use an atom per contestant instead of one atom for all contestants
- [ ] Add strictmode
- [x] Incorrect responses should deactivate contestant
- [ ] Implement ability to change username
