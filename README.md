# DSA Lab

An interactive data structures and algorithms lab. Try a sorting step on the homepage, then choose a lesson to experiment with your own numbers or explore how a structure behaves.

**[Open DSA Lab](https://gsandss-dsa.vercel.app/)**

## Explore the lessons

- **Sorting.** Step through bubble, selection, insertion, merge, or quick sort. Enter a custom array, use auto-play, or step back to inspect a change.
- **Linear structures.** Read an array by index, follow a linked list, push and pop a stack, or enqueue and dequeue items.
- **Non-linear structures.** Explore a tree depth first, visit a graph breadth first, extract a heap’s minimum, and experiment with collisions in a hash table or hash set.

## Run and deploy

Use Node.js 24. From `frontend/`, run `npm ci` and `npm run dev`. Run `npm run build` followed by `npm run preview` to test the production build.

On Vercel, import this repository, set the root directory to `frontend`, and use the Vite preset with output directory `dist`. Each browser runs its own simulations. The public site works without environment variables.

To use the optional Express sorting API locally, run `npm ci` and `npm start` in `backend/`, set `VITE_API_BASE=http://localhost:4000` in `frontend/.env.local`, and restart Vite.

## Author

Gavin Sands · Iowa State University · Computer Science, with minors in Applied AI and Artificial Intelligence.
