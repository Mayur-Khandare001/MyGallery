**_ Setup instructions _**:

Clone the project and install dependencies:
npm install

Run Commands:
npm run dev
: Development server
npm run build
: Production bundle

**_ API handling strategy _**

Primary Layer: Unsplash API for high-quality production images.
Caching: TanStack Query (React Query) handles deduplication, caching, and background synchronization of image metadata.

**_ InstantDB schema and usage _**

chema Entity: interactions
{
type: 'like' | 'emoji' | 'comment',
imageId: string, // Matches Unsplash Image ID
payload: string, // Stores the emoji char or comment text
username: string, // Author of the interaction
timestamp: number // Global ordering
}

**_ Key React decisions _**

Optimized Data Transactions
Transactions are wrapped in useCallback and memoized to prevent expensive re-renders in the activity feed, ensuring 60fps performance even during high-frequency real-time updates.

**_ Challenges faced and how you solved them _**

Toggling Likes: Challenge: User shouldn't be able to span multiple likes. Solution: Implemented "Toggle" logic that hat checks for existing authorship of a specific like type before transacting.

**_ What you would improve with more time _**

Search & Filter: Add category-based browsing through Unsplash topic APIs.
collection: To add a photos to the collections.
