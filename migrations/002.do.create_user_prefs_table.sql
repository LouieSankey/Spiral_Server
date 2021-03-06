DROP TABLE IF EXISTS pref;
CREATE TABLE pref (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    account INTEGER REFERENCES account(id) NOT NULL,
    gong boolean DEFAULT true,
    elapsed_time_until_break INTEGER DEFAULT 120,
    break_duration INTEGER DEFAULT 20,
    idle_reset INTEGER DEFAULT 5,
    date_published TIMESTAMPTZ DEFAULT now() NOT NULL
);