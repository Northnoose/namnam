# Deferred Items — Phase 01 Foundation

Items discovered during execution that are out of scope for current tasks.
These are NOT bugs introduced by current work — they are pre-existing issues.

## Out-of-Scope Findings

### 1. Deprecated Headless UI API in Navbar.tsx
- **Discovered during:** Plan 03, Task 1
- **Severity:** Hint (not error)
- **Files affected:** src/components/Navbar.tsx (lines 45, 66, 68, 79)
- **Issue:** `Disclosure.Button` and `Disclosure.Panel` are deprecated in `@headlessui/react` v2.
  The modern API uses `<DisclosureButton>` and `<DisclosurePanel>` as named exports.
- **Pre-existing:** Yes — not caused by Plan 03 changes
- **Recommended fix (deferred to Phase 2 or later):** Migrate to headless UI v2 API:
  ```tsx
  import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
  // Replace Disclosure.Button with DisclosureButton
  // Replace Disclosure.Panel with DisclosurePanel
  ```
