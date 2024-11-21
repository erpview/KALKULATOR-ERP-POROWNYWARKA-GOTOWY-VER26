## CSV Import Instructions

To import or update systems data using CSV:

1. Use the template file at `src/templates/systems_template.csv`
2. Follow these column formats:
   - `name`: System name (text, required)
   - `vendor`: Vendor name (text, required)
   - `website`: Website URL (text, required)
   - `description`: System description (text, required)
   - `size`: Company sizes as array (e.g., "{Małe,Średnie,Duże}")
   - Boolean fields (true/false): finance, production, warehouse, crm, bi, hr, cloud, onpremise, hybrid, mobile, api

3. Run the import command:
```bash
npm run import-csv src/templates/systems_template.csv
```

Notes:
- The import will update existing systems (matching by name) or add new ones
- Boolean fields can be left empty for null values
- Size array must be in PostgreSQL array format with curly braces