Data Standards

- Dates: DD/MM/YYYY across API requests and responses; UI displays DD/MM/YYYY and converts to and from native inputs. Database stores dates as SQL `DATE` for integrity.
- Currency: decimal with 2 places; UI uses BRL formatting; API accepts numbers.
- Enums: financial categories (`sale`, `cost`, `service`, `input`, `labor`, `tax`), movement types (`IN`, `OUT`), stock units (`kg`, `sc`, `t`, `un`).

Field Types

- farms: `name` string(120), `location` string(120), `latitude` float, `longitude` float, `owner_id` int.
- lots: `name` string(80), `area_ha` float, `farm_id` int, `crop_year` int?, `coordinates` JSON.
- crops: `lot_id` int, `planted_date` date DD/MM/YYYY, `harvested_date` date? DD/MM/YYYY, `yield_bags` float?.
- financial_records: `crop_id` int?, `lot_id` int?, `type` enum IN|OUT, `category` string(50), `description` string(255)?, `value` decimal(14,2), `date` date DD/MM/YYYY.
- stocks: `crop_id` int?, `lot_id` int?, `product` string(120), `movement` enum IN|OUT, `quantity` decimal(14,3), `unit` string(10), `date` date DD/MM/YYYY.
- users: `name` string(100), `email` string(100 unique), `password` string(255 hash), `is_active` bool.

Validation and Serialization

- API accepts date strings in either `DD/MM/YYYY` or `YYYY-MM-DD` (for backward compatibility) and normalizes to `DATE` in DB.
- API serializes dates as `DD/MM/YYYY` in all response payloads.
- Frontend converts between `<input type="date">` values (`YYYY-MM-DD`) and API format using `toApiDate`/`fromApiDateToIso`.

Notes

- Database uses proper `DATE` type; formatting applies only at API and UI boundaries.
- Avoid storing formatted date strings in DB or local state when the temporal type is sufficient.
