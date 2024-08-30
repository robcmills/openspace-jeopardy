### Todo

- [ ] Add custom favicon
- [ ] Host timer expiration should disable all contestant buzzers
- [x] Style buzzer button
- [ ] Ability for host to edit scores
- [x] Fix disabled final jeopardy response inputs
- [x] Implement automatic activation of previous active contestant in case of incorrect response
- [x] Pull final jeopardy clues from database
- [x] Disconnected contestants should not disappear (add an online status indicator)
- [x] Add eslint and prettier
- [x] Pull tsconfig into root
- [x] Scrape final jeopardy clues
- [ ] Configure aliases to get rid of all relative imports
- [ ] Implement database backed storage
  - [ ] for games
  - [ ] for sessions
- [x] Implement host route for displaying correct responses in a separate window
- [ ] Prevent negative scores (easy mode)
- [ ] Add host controls ui for mobile hosts (not just keyboard shortcuts)
  + prev/next game state
  + toggle timer
  + reveal money tiles
  + activate random contestant
  + zoom in/out categories
  + pan categories
- [x] setContestantQuestion should not broadcast to all contestants
- [x] Implement final jeopardy scoring state
- [x] Fix sidebar css scroll
- [x] Implement scroll-to-active contestant if not visible
- [x] Widen gap between "join as contestant" and "join as spectator" buttons
- [x] Widen gap between contestants and spectators in sidebar
- [ ] Make audio controls smaller (for mobile)
- [ ] Improve deployment process
  + [ ] Automate all parts with a script
  + [ ] Record deployed git hash
- [x] Increase default font size
- [x] Encapsulate lobby events in a room
- [x] Make GameLayout responsive
- [ ] Implement winners stage
- [ ] Clean up logging
- [x] Check for username uniqueness
- [x] Add eslint
- [x] Purge remaining semi-colons
- [ ] Clean up clues type
- [ ] Implement admin api endpoints
- [ ] Implement mute for all contestants (to avoid echo)
- [ ] Refactor contestantsAtom to use an atom per contestant instead of one atom for all contestants
- [ ] Implement ability to change username
- [ ] Fix pan categories in Safari
- [x] Fix final jeopardy logo img in landscape container
- [x] Implement keyboard shortcuts for contestants (space for buzzer)
- [x] Improve login page
- [x] Spectators
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
- [x] Make jeopardy round visually distinct from double jeopardy
- [x] Implement GameLayout
- [x] Join as contestant 
- [x] Join as spectator
- [x] Move css into inline styles to be consistent
- [x] Combine gameState and setGameState hooks
- [x] Remove clues from src and load from env variable
- [x] Disable or hide disconnected contestants
- [x] Implement ability for host to set active player
- [x] Add strictmode
- [x] Incorrect responses should deactivate contestant
- [x] Add padding to game board


### Bugs

- final jeopardy empty wager that is auto-submitted causes an error

- double login
  + user logged in on mobile
  + user wagered on daily double
  + host assigned points for correct answer
  + somehow user was disconnected and taken to "join as" page
  + joining as contestant (again) resulted in duplicate contestants with the same name but different scores

  + login via an incognito window
  + open another incognito window
  + close that second window
  + rejoin as contestant in first window
  + duplicate contestants created



