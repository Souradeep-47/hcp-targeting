# HCP Targeting – IQVIA Claims (React + Vite)

A quick React port of your single-file app. Tailwind is loaded via CDN for zero-config styling.

## Run locally

```bash
# 1) Install dependencies
npm i

# 2) Start dev server
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Notes
- Upload a CSV with headers like: `hcp_id, hcp_specialty, site_of_care, ta, claim_date, last_seen_date, next_appt_date, drug_name, drug_class, paid_amount, new_patient_flag`.
- For Gemini generation, put your key in the UI (the code defaults to a placeholder). If empty, it uses heuristics.
- `Export` downloads aggregated HCP insights as CSV.
- Tailwind is via CDN in `index.html`. If you prefer full Tailwind build, add PostCSS + tailwind.config and remove the CDN.
