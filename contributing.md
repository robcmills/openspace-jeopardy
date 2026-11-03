## Run locally:

Start the server and client:

```bash
bun run dev
```

Visit http://localhost:3000

## Clue database

Clues live in `data/database.sqlite` (gitignored), scraped from j-archive.com.
Build or update it from the repo root:

```bash
bun run scrape                    # fetch new seasons/episodes, then parse
bun data/scrape.ts --offline      # re-parse the cached html without fetching
DATABASE_PATH=/tmp/new.sqlite bun run scrape   # write to another file
```

Fetching honors j-archive's 20 second crawl delay from robots.txt and only
fetches uncached episodes, so a full first run takes days. `CRAWL_DELAY_MS`
overrides the delay for small catch-up runs.

Board rounds are stored as rounds 1-3 (3 is Triple Jeopardy) and Final
Jeopardy as round 4. Code that reads rounds and the database must be deployed
together.

## Deploy

See `aws.md` (gitignored, kept with the server secrets).
