## Getting Started

First, run this command install packages.

```bash
pnpm install
# or any node js package manage you like
npm install
```

Then, run this command to start the dev server locally.

```bash
pnpm dev
# or any node js package manage you like
npm run dev
```

## Features

### Basic Requirements

- [x] Show `shifts.json` data
- [x] Display shifts as requested
- [x] Horizontal scrolling if there is more than 3 months
- [x] Decline/ confirm shift that is pending
- [x] Cannot change after it is declined or confirmed
- [x] Multiple selection for confirmation
- [x] Search shifts by caregiver's name
- [x] Fixed position search bar
- [x] Immediate search result

### Bonus Requirements

- [x] Responsive design
- [x] API backend

### Extra Features

- [x] React Query for async state management
- [x] React Hook Form for form scalability
- [x] Select by month/ date
- [x] Toast for update and reset
- [x] Layout animations
- [x] Filter by pending status
- [x] Reset button to update the DB
- [x] Deployment on Vercel
- [x] PostgreSQL DB
- [x] Prisma
- [x] Loading Spinner

## Todo

- [ ] Replace unclickable button with correct html tags
- [ ] Replace current search logic with searching library like fuse.js
- [ ] Dry reset feature
- [ ] Add reset pop up modal
- [ ] Add enum for statuses
- [ ] Extract useQuery hooks
- [ ] Add batch decline button and relevant logic, with minor changes to the current form values
- [ ] Throttle requests
