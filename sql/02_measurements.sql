DROP TABLE IF EXISTS Measurements CASCADE;


-- SCHEMA
CREATE TABLE Measurements (

    -- General
    measurement_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    trash_bin_id INTEGER NOT NULL REFERENCES Trash_Bins (trash_bin_id) ON UPDATE CASCADE ON DELETE CASCADE,
    measured_distance DECIMAL NOT NULL CHECK(measured_distance >= 0), -- Centimeter
    measured_filling_height DECIMAL NOT NULL CHECK(measured_filling_height >= 0) -- Centimeter
);
