import { createClient } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/client";

// Create the Liveblocks client
export const client = createClient({
    publicApiKey: "pk_dev_qppilCRaKz3YJJlMYze9P4suIGFiup3N-CMjmTsf1fzO3nRzSi5hLJLmJUIfV5eW" // Get this from liveblocks.io
});

// In JavaScript, we don't have type declarations, so we remove the TypeScript interfaces
// If you need to reference these types in comments for documentation:

/**
 * Presence shape:
 * {
 *   x: number;
 *   y: number;
 *   name: string;
 * }
 * 
 * Storage shape:
 * {
 *   spaces: Array of LiveObjects with shape:
 *   {
 *     name: string;
 *     x: number;
 *     y: number;
 *     width: number;
 *     height: number;
 *   }
 * }
 */

// Export LiveObject for use in other files
export { LiveObject };