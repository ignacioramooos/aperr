

## Plan: Consolidate newsletter + add 1D/1W chart ranges

### Issue 1: Two newsletter sections
The newsletter appears twice: once as `NewsletterSection` in `Index.tsx` (middle of homepage) and once in `Footer.tsx` (rendered on every page). The fix is to remove the `NewsletterSection` from `Index.tsx` and keep only the one in the footer (which already appears at the bottom of every page).

**Files to edit:**
- `src/pages/Index.tsx` — Remove the `NewsletterSection` component definition (lines 245-258) and remove it from the `Index` render (line 268). Reorder so `FinalCTA` is last before footer.

### Issue 2: Add 1D and 1W chart ranges

**Files to edit:**
- `supabase/functions/stock-history/index.ts` — Add `"1d"` and `"5d"` to `VALID_RANGES`. For `"1d"`, use `interval=5m&range=1d`. For `"5d"`, use `interval=15m&range=5d`. For the rest keep `interval=1d`.
- `src/components/dashboard/PortfolioTab.tsx` — Add `["1d","1D"]` and `["5d","1S"]` to the range selector arrays (both in the stock chart dialog and the portfolio chart if applicable).

