DROP TABLE IF EXISTS Trash_Bins CASCADE;


-- SCHEMA
CREATE TABLE Trash_Bins (

    -- General
    trash_bin_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    description CHARACTER VARYING(255) NOT NULL,
    filling_height DECIMAL NOT NULL CHECK (filling_height >= 0) DEFAULT 0, -- in Centimeter
    capacity DECIMAL NOT NULL CHECK (capacity >= 0) DEFAULT 0, -- Liter

    -- Coordinates
    coordinates GEOGRAPHY(POINT) DEFAULT 'POINT(0.0 0.0)'
);
